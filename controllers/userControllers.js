import { log } from 'console';
import URL from '../models/userSchema.js';
import shortid from 'shortid';

const ShortURL = async (req, res) => {
  console.log(req.body);

  try {
    const body = req.body;

    if (!body) {
      return res
        .status(404)
        .json({ status: 'pending', message: 'URL Not defined' });
    }

    const shortID = shortid.generate();

    const newURL = await URL.create({
      originalURL: body.originalURL,
      shortidURL: shortID,
      visithistory: [],
    });

    if (!newURL) {
      return res
        .status(404)
        .json({ status: 'pending', message: 'URL not created' });
    }

    return res.render('home', {
      sparshid: shortID,
    });
  } catch (err) {
    console.log('Error occurred');
    return res
      .status(404)
      .json({ status: 'pending', message: 'Please enter a unique URL' });
  }
};

const redirecturl = async (req, res) => {
  try {
    const shortidURL = req.params.sid;

    const entry = await URL.findOneAndUpdate(
      {
        shortidURL,
      },
      {
        $push: {
          visithistory: {
            timestamps: Date.now(),
          },
        },
      },
      {
        new: true,
      }
    );

    if (!entry) {
      return res
        .status(404)
        .json({ status: 'pending', message: 'Entry does not exist' });
    }
    return res.redirect(entry.originalURL);
  } catch (err) {
    console.log('Error occurred');
    return res
      .status(404)
      .json({ status: 'pending', message: 'There is some error' });
  }
};

const Analytics = async (req, res) => {
  const shortid = req.params.sid;
  const result = await URL.findOne({ shortidURL: shortid });

  return res.status(200).json({
    totalvisits: result.visithistory.length,
    analytics: result.visithistory,
  });
};

const Render = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect('/user/login');
    }
    const allurls = await URL.find({ createdBy: req.user._id });
    res.render('home', { urls: allurls });
  } catch (err) {
    console.log('Error occurred');
    return res
      .status(404)
      .json({ status: 'pending', message: 'Page not rendering properly' });
  }
};

export { ShortURL, redirecturl, Analytics, Render };
