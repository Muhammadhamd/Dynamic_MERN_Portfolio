import express from 'express';
import dotenv from "dotenv"
import OpenAI from 'openai';
import path from "path"
const __dirname = path.resolve()
const router = express.Router();
dotenv.config(); // Load .env file

const apiKey = process.env.chatbotAPI
const openai = new OpenAI({apiKey});
// const mydata = `Portfolio.
// Home
// Contact
// Blogs
// About
// Services


// Hello it's me
// Muhammad Hamd
// And I'm a MERN Developer|
// As a student, I am highly motivated and always looking for opportunities to improve my skills To be better than before

 
 
 
//  Download CV
//  if someone asked for url link so wrap it in a tag 
// https://www.linkedin.com/in/muhammadhamd/
// https://github.com/muhammadhamd/
// HTML5
// CSS3
// JavaScript
// 50+ Projects done!
// Want to know about Me?
// I'm
// Muhammad Hamd
// I am a freshman at college. I am passionate about programming and have always been intrigued by the endless possibilities that come with it. Even as a teenager, I used to experiment with programming languages and create small, fun projects for myself. As I grew older, my fascination with programming turned into a full-blown passion that I want to pursue in my career.
// For me, programming is not just about creating algorithms or writing code; it's about solving complex problems, designing innovative solutions, and pushing the boundaries of what's possible. I believe that programming is a craft that requires creativity, attention to detail, and the ability to think outside the box. That's why I am constantly learning and developing my skills, trying out new programming languages, and exploring different programming paradigms.

// How and when I start Coding
// My coding journey is not too much long .I start coding when i was 12 or 13 ,I remember I developed a flying airplane game using scratch when i was 12 years old. Right now im learning full stack web development

// why I love to Code
// Aside from programming, I am also interested in software engineering, database design, and web development. I see these fields as complementary to programming, and I believe that having a solid understanding of them will allow me to create more effective and efficient software solutions.
// Ilove to code because it make you think about problem solving and also it give me pleaser when others are setisfied by my code

// Instagram latest posts
// Show All
// Want to contact Me?
// .

// .

// YourName....
// YourNumber....
// YourEmail....
// ....What is 2+2?...
 
// .

// Reach out to us
// .`

// const mydata2 =`Muhammad Hamd  is a Professional MERN Developer and student of 2nd Year of GOVT Degree boys College. i am good what about you?
// He is passionate about his work has to be perfect, and he love to code , He is a self-learner always trying to learn something new that will help him in the future , Currently He working with latest technologies like HTML5, Tailwind CSS, JavaScript ES8, Node.js, React, mongodb etc.
// Apply for the job yourself instead.<br>his goal is to have companies ask him to join their team. To achieve this goal he have to build a strong name in social platforms that's why he have many accounts on different social platforms like Linkedin, Github, Upwork, FiveR, Facebook, Instagram etc. All his Social accounts link are.
// https://www.instagram.com/hamd_studiology/
// https://www.github.com/muhammadhamd/
// https://www.facebook.com/muhammadhamd11/ 
// wrap any link providing in a tag for example if sending fb link so wrap it like this <a href="https://www.facebook.com/muhammadhamd11/">facebook Link</> 

// if you are intrested in work with me  or just to say hello please don't hesitate to connect me on social media.`;


// const mydata3 = `
// i am Muhammad Hamd i am web developer and fresher seeking for job my email is muhammadhamd.dev@gmail.com and muhammadhamdali5722gmail.com i have completed 5+ projects on freelance upwork
// `
// phone number is(+92)3251452080  name is muhammd hamd 19 years old web developer work at zcoders i am student of commerce and web development i study commerce at  7d anda more college and i study web develpment at SMIT i am coding since i was 12 years old i live in karachi pakistan i also work as freelancer, you should reply as i am speaking my commerce teacher name is Sir Adnan i am in 2nd year of my collegeand my web development teacher name is sir Inzamam my facebook url is https://facebook.com/muhammadhamd11 my insta id is https://instagram.com/hamd_studiology and https://instagram.com/hamd_prvt this one is for my personal yse ${mydata} ${mydata2} , ${mydata3} ,old messages are ${oldmsgs} reply from the old msgs between bot and user use it as history msgs 
const data = {
  aboutMuhammadHamd: {
    fullName: "Muhammad Hamd",
    age: 19,
    profession: "MERN Developer",
    status: "2nd Year Student at GOVT Degree Boys College",
    location: "Karachi, Pakistan",
    phoneNumber: "(+92) 3251452080",
    education: {
      commerce: {
        degree: "Commerce",
        institution: "7D and More College"
      },
      webDevelopment: {
        degree: "Web Development",
        institution: "SMIT"
      }
    },
    codingSince: "Since the age of 12",
    codingExperience: "5+ years",
    interests: [
      "Software Engineering",
      "Database Design",
      "Web Development"
    ],
    socialMedia: {
      facebook: "https://facebook.com/muhammadhamd11",
      instagram: [
        "https://instagram.com/hamd_studiology",
        "https://instagram.com/hamd_prvt"
      ],
      linkedin: "https://www.linkedin.com/in/muhammadhamd/",
      github: "https://github.com/muhammadhamd/"
    },
    email: [
      "muhammadhamd.dev@gmail.com",
      "muhammadhamdali5722@gmail.com"
    ]
  },
  introduction: `Hello, it's me, Muhammad Hamd. I'm a MERN Developer and a second-year student at GOVT Degree Boys College. I'm highly motivated and always seeking opportunities to enhance my skills.`,
  codingJourney: `I've been coding since I was 12 or 13 years old. I remember developing a flying airplane game using Scratch.`,
  passionForCoding: `I love coding because it challenges me to solve problems and gives me immense pleasure when others appreciate my work.`,
  technologies: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB"
  ],
  professionalExperience: {
    status: "Professional MERN Developer",
    workEnvironment: "Currently working with HTML5, Tailwind CSS, JavaScript ES8, Node.js, React, MongoDB, etc.",
    goals: "My goal is to have companies invite me to join their teams. I'm building a strong presence on social platforms to achieve this.",
    projects: "I've completed 50+ projects, including freelance work on platforms like Upwork."
  },
  contactInformation: {
    prompt: "Want to contact me?",
    contactDetails: {
      name: "Your Name",
      number: "Your Number",
      email: "Your Email"
    },
    question: "What is 2+2?"
  },
  commonQuestions:{
    AskingForLink:"here is link of (the asked link...) <a href='link'>link asked for....</a>"
  }
};

router.post('/chatbot-message', async (req, res) => {
  try {
    const userMessage = req.body.message; // Assuming you send the message in the request body
    const oldmsgs= req.body.oldmsgs; // Assuming you send the message in the request body

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "system", "content":data},
       
        
        {"role": "user", "content":userMessage}
    ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,

     
    });

    const aiResponse = response.choices[0]?.message?.content;

    res.json({aiResponse})
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router
