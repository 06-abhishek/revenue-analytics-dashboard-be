import express from "express";
import {
  getMonthlyRevenue,
  getMonthlyDetails,
  getProductWiseRevenue,
  getProductSalesBreakdown,
} from "../controllers/revenue.controller.js";

const router = express.Router();

router.get("/monthly/:year", getMonthlyRevenue);
router.get("/details/:year/:month", getMonthlyDetails);
router.get("/product-wise/:year/:month", getProductWiseRevenue);
router.get("/sales-breakdown/:year/:month", getProductSalesBreakdown);

export default router;
