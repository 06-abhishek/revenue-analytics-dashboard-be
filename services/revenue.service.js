import Order from "../models/Order.js";
import Product from "../models/Product.js";
// import redisClient from "../utils/redis.js";

// const CACHE_EXPIRY = 60 * 60; // 1 hour

export const getMonthlyRevenue = async (year) => {
  const cacheKey = `monthlyRevenue:${year}`;
  // const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const start = new Date(`${year}-01-01`);
  const end = new Date(`${+year + 1}-01-01`);

  const data = await Order.aggregate([
    { $match: { date: { $gte: start, $lt: end } } },
    { $unwind: "$products" },
    {
      $group: {
        _id: { $month: "$date" },
        total: {
          $sum: { $multiply: ["$products.price", "$products.quantity"] },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(data));
  return data;
};

export const getMonthlyDetails = async (year, month) => {
  const cacheKey = `monthlyDetails:${year}-${month}`;
  // const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const start = new Date(`${year}-${month}-01`);
  const end = new Date(`${year}-${+month + 1}-01`);

  const data = await Order.find({ date: { $gte: start, $lt: end } });
  // await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(data));
  return data;
};

export const getProductWiseRevenue = async (year, month) => {
  const start = new Date(`${year}-${month}-01`);
  const end = new Date(`${year}-${+month + 1}-01`);

  return Order.aggregate([
    { $match: { date: { $gte: start, $lt: end } } },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productId",
        totalRevenue: {
          $sum: { $multiply: ["$products.price", "$products.quantity"] },
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        name: "$product.name",
        totalRevenue: 1,
      },
    },
  ]);
};

export const getProductSalesBreakdown = async (year, month) => {
  const revenue = await getProductWiseRevenue(year, month);
  const total = revenue.reduce((acc, item) => acc + item.totalRevenue, 0);
  return revenue.map((item) => ({
    ...item,
    percentage: ((item.totalRevenue / total) * 100).toFixed(2),
  }));
};
