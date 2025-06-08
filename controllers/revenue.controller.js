import asyncHandler from "../middlewares/asyncHandler.js";
import * as revenueService from "../services/revenue.service.js";

export const getMonthlyRevenue = asyncHandler(async (req, res) => {
  const { year } = req.params;
  const data = await revenueService.getMonthlyRevenue(year);
  res.status(200).json(data);
});

export const getMonthlyDetails = asyncHandler(async (req, res) => {
  const { year, month } = req.params;
  const data = await revenueService.getMonthlyDetails(year, month);
  res.status(200).json(data);
});

export const getProductWiseRevenue = asyncHandler(async (req, res) => {
  const { year, month } = req.params;
  const data = await revenueService.getProductWiseRevenue(year, month);
  res.status(200).json(data);
});

export const getProductSalesBreakdown = asyncHandler(async (req, res) => {
  const { year, month } = req.params;
  const data = await revenueService.getProductSalesBreakdown(year, month);
  res.status(200).json(data);
});
