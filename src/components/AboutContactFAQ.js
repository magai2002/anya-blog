import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">About This Blog</h1>
      <p className="text-lg leading-relaxed">
        Welcome to my personal blog, a space where thoughts, stories, and experiences come to life. 
        Here, I share deep reflections, creative writing, and meaningful discussions about topics that matter.
      </p>
      <p className="mt-4 text-lg leading-relaxed">
        This blog is inspired by a love for literature, storytelling, and personal growth. 
        I hope you find something here that resonates with you.
      </p>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
      <p className="text-lg leading-relaxed">
        If you’d like to get in touch, feel free to email me at:
      </p>
      <p className="mt-2 text-lg font-semibold text-blue-600">your.email@example.com</p>
      <p className="mt-4 text-lg leading-relaxed">
        You can also reach out via social media or leave a comment on one of my blog posts.
      </p>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "What is this blog about?", answer: "This blog explores thoughts, stories, and reflections on various topics." },
    { question: "Can I contribute to the blog?", answer: "Currently, this is a personal blog, but I welcome guest contributions upon request." },
    { question: "How can I support this blog?", answer: "You can support by reading, sharing, and engaging with the content." }
  ];

  return (
    <div className="max-w-3xl mx-auto p-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-lg leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { About, Contact, FAQ };
