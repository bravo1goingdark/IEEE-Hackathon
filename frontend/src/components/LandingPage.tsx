import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-green-50">
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-xs">
            <img height = {150} width={200} src={logo} />
        </div>
        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Get Started
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="lg:w-1/2">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl lg:text-6xl font-bold text-black-400 mb-6"
            >
              Track Your Carbon Footprint, Reduce, and Offset!
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg lg:text-xl text-green-700 mb-6"
            >
              Join the movement to reduce carbon emissions. Track your daily
              activities and learn how to reduce your environmental impact!
            </motion.p>
            <motion.button
              onClick={() => navigate("/carbon")} // Wrap navigate in a function
              whileHover={{ scale: 1.05 }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Start Tracking Now
            </motion.button>
          </div>

          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW90eTltc3dqZXp3YmV1cWEyNTU1dmpnNHprZzcydGI1MnNxbjBjdCZlcD12MV9naWZzX3NlYXJjaCZjdD1z/A6KHyt3LyHe3mYYLCm/giphy.gif"
              alt="Earth Care Animation"
              className="w-4/5 lg:w-3/4 h-auto rounded-full" 
            />
          </div>
        </div>
      </main>

      <section className="bg-green-100 mt-20 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-600 text-center mb-10">
            Why Track Your Carbon Footprint?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src="https://media.giphy.com/media/pvpGuXNwbjLMLU6NHd/giphy.gif?cid=790b7611u6ldk7m2xmp5vr5bt9vzn4ccnp1z4h67v8intje6&ep=v1_gifs_search&rid=giphy.gif&ct=s"
                alt="Reduce Carbon Footprint"
                className="h-24 w-auto mx-auto mb-4 object-contain" 
              />
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Reduce Your Footprint
              </h3>
              <p className="text-green-600">
                Discover actionable insights on how to reduce your daily carbon
                emissions and make a positive impact on the environment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTRpMnVva3gxc3Bmcmt1Z3hoZWt5NWpuNXBsNzNicGI4eTY1bXdoaSZlcD12MV9naWZzX3NlYXJjaCZjdD1z/atdrbH41uIL1Lepm1d/giphy.gif" // Ensure you have this image
                alt="Monitor Carbon Footprint"
                className="h-24 w-auto mx-auto mb-4 object-contain" // Consistent height
              />
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Monitor Daily Activities
              </h3>
              <p className="text-green-600">
                Log your daily energy consumption, transportation habits, and
                more to see how much carbon you're emitting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src="https://media.giphy.com/media/mXVj9tIHLkhWySKZj2/giphy.gif?cid=790b7611vc4gwg6v5e36hgqc021labf4x2liubnlrww2vyam&ep=v1_gifs_search&rid=giphy.gif&ct=s" // Ensure you have this image
                alt="Offset Carbon Footprint"
                className="h-24 w-auto mx-auto mb-4 object-contain" // Consistent height
              />
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Offset Your Emissions
              </h3>
              <p className="text-green-600">
                Invest in carbon offset projects to neutralize your emissions
                and contribute to global sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>
            &copy; 2024 Ecosphere. All rights reserved. Made with care for the
            planet.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
