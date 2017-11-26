var local = process.env.LOCAL;

if (local) {
    module.exports = {
        twitterAuth: {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackUrl: 'http://127.0.0.1:3000/auth/twitter/callback'
        }
    }
} else {
    module.exports = {
        twitterAuth: {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackUrl: 'https://mighty-fjord-76860.herokuapp.com/auth/twitter/callback'
        }
    }
}