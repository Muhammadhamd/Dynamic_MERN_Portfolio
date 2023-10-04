
// // Define a route to fetch Instagram data
// app.get('/api/instafeed', async (req, res) => {
//     try {
//       // Replace 'YOUR_INSTAGRAM_ACCESS_TOKEN' with your actual Instagram API token
//       const instagramApiUrl = `https://graph.instagram.com/v12.0/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=YOUR_INSTAGRAM_ACCESS_TOKEN&limit=3`;
  
//       const response = await fetch(instagramApiUrl);
//       const data = await response.json();
  
//       // Extract the relevant data from the Instagram API response
//       const posts = data.data.map((post) => ({
//         id: post.id,
//         caption: post.caption,
//         image: post.media_url,
//         link: post.permalink,
//       }));
  
//       res.json(posts);
//     } catch (error) {
//       console.error('Error fetching Instagram data:', error);
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   });
  