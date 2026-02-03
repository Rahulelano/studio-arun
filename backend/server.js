import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure upload directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Storage setup for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'))
  }
});
const upload = multer({ storage: storage });

// --- MONGODB CONNECTION ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    seedData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// --- SCHEMAS & MODELS ---
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // In production, hash this!
});
const Admin = mongoose.model('Admin', adminSchema);

const gallerySchema = new mongoose.Schema({
  category: String,
  title: String,
  src: String,
  date: { type: Date, default: Date.now }
});
// Duplicate the id to _id for frontend compatibility or handle in response
gallerySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});
const GalleryItem = mongoose.model('GalleryItem', gallerySchema);

const blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  tags: [String],
  keywords: String,
  content: [String],
  excerpt: String,
  image: String, // Cover image
  additionalImages: [String],
  date: String,
  readTime: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});
blogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});
const BlogPost = mongoose.model('BlogPost', blogSchema);


// --- SEED DATA ---
async function seedData() {
  try {
    // 1. Seed Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        email: "arunprasadphotography@gmail.com",
        password: "Arunanju@9"
      });
      console.log('Admin credentials seeded.');
    }

    // 2. Seed Blog (from previous static data)
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      const initialPosts = [
        {
          title: "Intimate Weddings: A Return to Meaning",
          category: "Insight",
          date: "Oct 24, 2025",
          readTime: "5 min read",
          excerpt: "Why couples in 2025 are choosing smaller, more meaningful celebrations over grand spectacles.",
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=80",
          content: [
            "In recent years, we've witnessed a beautiful shift in the wedding industry.",
            "The era of the 'Big Fat Indian Wedding', while still glorious, is making space for something more personal.",
            "Couples today want to spend their special day with the people who truly matter."
          ]
        },
        {
          title: "The Physics of Golden Hour",
          category: "Technique",
          date: "Nov 02, 2025",
          readTime: "3 min read",
          excerpt: "Understanding the scientific and artistic reasons why the hour before sunset creates the most cinematic wedding portraits.",
          image: "https://images.unsplash.com/photo-1506169894395-36397e4aaee4?w=800&h=1000&fit=crop&q=80",
          content: [
            "You've probably heard your photographer obsess over 'Golden Hour'.",
            "Golden Hour occurs roughly one hour after sunrise and one hour before sunset.",
            "Trust us, the results are always worth it."
          ]
        },
        {
          title: "Royalty in Chettinad",
          category: "Stories",
          date: "Dec 15, 2025",
          readTime: "8 min read",
          excerpt: "Documenting a traditional Tamil Brahmin wedding set against the heritage backdrop of Karaikudi.",
          image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop&q=80",
          content: [
            "Chettinad is a place where time seems to stand still.",
            "We recently had the honor of documenting a traditional Tamil Brahmin wedding in the heart of Karaikudi.",
            "From the early morning janavasam to the grand oonjal ceremony, every ritual was steeped in history."
          ]
        },
        {
          title: "The Art of Natural Posing",
          category: "Guide",
          date: "Jan 10, 2026",
          readTime: "6 min read",
          excerpt: "Tips for couples who feel camera shy but want those candid, effortless shots.",
          image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=800&h=1000&fit=crop&q=80",
          content: [
            "\"We are not models.\" This is the most common phrase we hear from our couples.",
            "The best wedding photos are the ones that feel authentic.",
            "Remember, the focus should be on your connection with your partner, not the camera."
          ]
        }
      ];
      await BlogPost.insertMany(initialPosts);
      console.log('Blog posts seeded.');
    }

    // 3. Seed Gallery (Sample data)
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      const initialGallery = [
        { category: 'Wedding', title: 'Traditional', src: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800' },
        { category: 'Wedding', title: 'Candid Moment', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800' },
        { category: 'Portrait', title: 'Editorial', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
        { category: 'Maternity', title: 'Glow', src: 'https://images.unsplash.com/photo-1551408264-5ea7fa747761?w=800&q=80' },
        { category: 'Fashion', title: 'Street Style', src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80' },
        { category: 'Films', title: 'Cinematic', src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=800&q=80' }
      ];
      await GalleryItem.insertMany(initialGallery);
      console.log('Gallery items seeded.');
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  }
}


// --- API ROUTES ---

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email, password });
    if (user) {
      res.status(200).json({ success: true, token: 'admin-session-token-' + user._id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Gallery Endpoints
app.get('/api/gallery', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ date: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/gallery', upload.single('image'), async (req, res) => {
  try {
    const { category, title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const newItem = await GalleryItem.create({
      src: `http://localhost:${PORT}/uploads/${file.filename}`,
      category: category || 'Uncategorized',
      title: title || ''
    });

    res.json({ success: true, item: newItem });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await GalleryItem.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Blog Endpoints
app.get('/api/blog', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/blog', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'additionalImages', maxCount: 10 }]), async (req, res) => {
  try {
    const { title, excerpt, content, category, author, tags, keywords } = req.body;
    const files = req.files;

    let coverImage = '';
    if (files['image'] && files['image'][0]) {
      coverImage = `http://localhost:${PORT}/uploads/${files['image'][0].filename}`;
    }

    let additionalImages = [];
    if (files['additionalImages']) {
      additionalImages = files['additionalImages'].map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
    }

    // Parse tags if string
    let parsedTags = [];
    if (typeof tags === 'string') {
      parsedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    } else if (Array.isArray(tags)) {
      parsedTags = tags;
    }

    const newPost = await BlogPost.create({
      title: title || 'Untitled',
      excerpt: excerpt || '',
      content: content ? (Array.isArray(content) ? content : [content]) : [],
      category: category || 'General',
      tags: parsedTags,
      keywords: keywords || '',
      author: author || 'Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: coverImage,
      additionalImages: additionalImages,
      readTime: '5 min read' // Placeholder
    });

    res.json({ success: true, post: newPost });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// --- EMAIL ENDPOINT (Keep existing) ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, subject, message, type, date, city } = req.body;

  let mailOptions = {
    from: `"Running Studio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: subject || `New Booking Request from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #D4AF37;">New Inquiry Received</h2>
        <p>You have received a new message via your website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
          </tr>
          ${email ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
          </tr>` : ''}
          ${date ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${date}</td>
          </tr>` : ''}
          ${city ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>City:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${city}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${message || 'No message provided.'}</td>
          </tr>
        </table>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
