
import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const LandingHero = () => {
  const isMobile = useIsMobile();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  // Create separate variants with different transitions
  const fadeInDelayed1 = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.2 } 
    }
  };

  const fadeInDelayed2 = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.4 } 
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto py-8">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ats-darkblue to-ats-blue mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        ATS Resume Builder
      </motion.h1>
      
      <motion.p
        className="text-xl text-gray-700 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInDelayed1}
      >
        Create professionally formatted, ATS-friendly resumes tailored to the job you want
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInDelayed2}
      >
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="bg-ats-lightblue bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const features = [
  {
    title: "ATS Optimization",
    description: "Our AI ensures your resume passes through Applicant Tracking Systems with relevant keywords",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ats-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  {
    title: "Job-Specific Content",
    description: "Customized content based on the specific job description you're applying for",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ats-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
  },
  {
    title: "Professional Layout",
    description: "Beautiful html formatting that looks great both on screen and when printed",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ats-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
  },
];

export default LandingHero;
