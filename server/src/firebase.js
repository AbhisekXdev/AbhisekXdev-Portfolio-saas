import admin from 'firebase-admin';
import { config } from './config.js';

let firebaseApp;

if (config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey) {
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      privateKey: config.firebase.privateKey
    })
  });
} else {
  console.warn('Firebase Admin credentials are not configured. Protected admin routes will reject requests.');
}

export async function verifyFirebaseToken(req, res, next) {
  try {
    if (!firebaseApp) {
      return res.status(503).json({ message: 'Firebase Admin is not configured on the server.' });
    }

    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing Firebase bearer token.' });
    }

    const token = authHeader.slice(7);
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    console.error('Firebase token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired authentication token.' });
  }
}
