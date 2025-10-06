const Payments = require("../models/paymentSchema");
const Dues = require("../models/dueSchema");
const { apiResponse } = require("../utils/apiResponse");
const statusCodes = require("../utils/statusCodes");

async function getLastDues(req, res) {
  try {
    const { nc } = req.query;
    const last_dues = await Dues.findOne({ nc });
    if (!last_dues) {
      return apiResponse(
        res,
        "Dues Not Found for given NC number",
        null,
        statusCodes.NOT_FOUND
      );
    }
    return apiResponse(res, "Dues Found", last_dues, statusCodes.OK);
  } catch (error) {
    return apiResponse(res, error.message, error, statusCodes.BAD_REQUEST);
  }
}

async function paymentByNC(req, res) {
  try {
    const {
      nc,
      fee_per_month,
      paid_amount,
      paid_month,
      paid_no_of_months,
      payment_date,
      year,
      mode,
      taken_by,
    } = req.body;
    const last_dues = await Dues.findOne({ nc });
    if (paid_no_of_months <= 0 || paid_amount <= 0) {
      return apiResponse(
        res,
        "Invalid payment details",
        null,
        statusCodes.BAD_REQUEST
      );
    }
    const fee_amount_for_months = fee_per_month * paid_no_of_months;
    const dueAmount = last_dues?.due_amount ?? 0;
    const total_fee_with_dues = fee_amount_for_months + dueAmount;
    const left_amount = total_fee_with_dues - paid_amount;
    const new_due_amount = left_amount > 0 ? left_amount : 0;

    const newPayment = await Payments.create({
      nc,
      paid_amount,
      paid_month,
      paid_no_of_months,
      payment_date: new Date(payment_date) || new Date(),
      year,
      mode,
      taken_by,
    });

    const updated_dues = await Dues.findOneAndUpdate(
      { nc },
      { $set: { due_amount: new_due_amount, lastUpdated: new Date() } },
      { new: true, upsert: true }
    );

    return apiResponse(
      res,
      "Payment recorded successfully",
      {
        payment: newPayment,
        updated_dues,
      },
      statusCodes.CREATED
    );
  } catch (error) {
    console.error("Payment error:", error);
    return apiResponse(res, error.message, error, statusCodes.BAD_REQUEST);
  }
}

async function getLastPayment(req, res) {
  try {
    const { nc } = req.query;
    const last_payment = await Payments.findOne({ nc });
    if (!last_payment) {
      return apiResponse(
        res,
        "Payment Not Found for given NC number",
        null,
        statusCodes.NOT_FOUND
      );
    }
    return apiResponse(res, "Dues Found", last_payment, statusCodes.OK);
  } catch (error) {
    return apiResponse(res, error.message, error, statusCodes.BAD_REQUEST);
  }
}

async function getPaidMonths(req, res) {
  try{
    const { nc } = req.query;
    if (!nc) apiResponse(res, "NC number is required" , error, statusCodes.BAD_REQUEST);
    const result = await Payments.aggregate([
      { $match: { nc: Number(nc) } },
      { $unwind: "$paid_month" }, 
      {
        $group: {
          _id: "$year",
          months: { $addToSet: "$paid_month" }, // all paid months for that year
          totalPaidAmount: { $sum: "$paid_amount" },
          totalPaidMonths: { $sum: "$paid_no_of_months" },
        },
      },
      { $sort: { _id: 1 } }, // ascending year
      {
        $project: {
          _id: 0,
          year: "$_id",
          months: 1,
          totalPaidAmount: 1,
          totalPaidMonths: 1,
        },
      },
    ]);

    return apiResponse(res, "Payment Months", result, statusCodes.OK);
  } catch (error) {
    console.log(error);
    return apiResponse(res, error.message, error, statusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getLastDues,
  paymentByNC,
  getLastPayment,
  getPaidMonths
};
