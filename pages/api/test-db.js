// // pages/api/test-db.js
// import { connectToDatabase } from '@/lib/mongodb';

// export default async function handler(req, res) {
//   try {
//     await connectToDatabase();
//     console.log('✅ MongoDB Connected');
//     res.status(200).json({ message: 'Database connection successful' });
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//     res.status(500).json({
//       error: 'Database connection failed',
//       details: error.message || error.toString(),
//     });
//   }
// }
