import express from 'express';
import Visitor from '../models/Visitor.js';
import Menu from '../models/MenuItem.js';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// 2. QR Scan Trends (grouped by day)
router.get('/qr-trends/:username', async (req, res) => {
  // Find all restaurants for this user
  const restaurants = await Restaurant.find({ username: req.params.username });
  const restaurantIds = restaurants.map(r => r._id);
  const menus = await Menu.find({ restaurantId: { $in: restaurantIds } });
  const menuIds = menus.map(m => m._id);

  // Group visitors by date
  const data = await Visitor.aggregate([
    { $match: { menuId: { $in: menuIds } } },
    { $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      count: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
  ]);
  res.json(data.map(d => ({ date: d._id, count: d.count })));
});

// 3. Popular Menu Items (by views)
router.get('/popular-items/:username', async (req, res) => {
  // For demo, count items viewed in Visitor (if you store item views)
  // Here, just return dummy data
  res.json([
    { name: 'Pizza', views: 50 },
    { name: 'Burger', views: 30 }
  ]);
});

// 4. Customer Device Data (by user agent)
router.get('/device-stats/:username', async (req, res) => {
  // If you store device info in Visitor, aggregate here
  res.json([
    { device: 'Android', count: 40 },
    { device: 'iOS', count: 30 },
    { device: 'Desktop', count: 10 }
  ]);
});

// 5. Recent Customer Activity
router.get('/recent-activity/:username', async (req, res) => {
  // For demo, return last 10 visitors
  const restaurants = await Restaurant.find({ username: req.params.username });
  const restaurantIds = restaurants.map(r => r._id);
  const menus = await Menu.find({ restaurantId: { $in: restaurantIds } });
  const menuIds = menus.map(m => m._id);

  const visitors = await Visitor.find({ menuId: { $in: menuIds } })
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(visitors.map(v => ({
    timestamp: v.createdAt,
    name: v.name,
    itemsViewed: v.itemsViewed || [] // If you track this
  })));
});

export default router;