import { GetServerSideProps } from "next";

const page = () => {
  return (
    <div className=" min-h-screen">
      <nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Code Wolf</h1>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
            <a href="#" className="hover:text-gray-400">
              Features
            </a>
            <a href="#" className="hover:text-gray-400">
              Pricing
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section className=" py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            AI-Powered Code Review
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Improve your code quality with Code Wolf. Let AI analyze and review
            your code for best practices, efficiency, and potential issues.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className=" py-12">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            Why Choose Code Wolf?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className=" p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold text-gray-900">
                AI-Powered Insights
              </h4>
              <p className="mt-4 text-gray-600">
                Leverage the power of AI to identify potential bugs, performance
                improvements, and best practices in your code.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold text-gray-900">
                Instant Feedback
              </h4>
              <p className="mt-4 text-gray-600">
                Get real-time code reviews as you write. Receive instant
                feedback to improve your codebase.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold text-gray-900">
                Seamless Integration
              </h4>
              <p className="mt-4 text-gray-600">
                Integrate Code Wolf easily into your workflow and maintain
                consistent code quality.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h3 className="text-5xl font-bold text-onyx">
            Future Plans for Code Wolf
          </h3>
          <p className="mt-4 text-4xl text-onyx">
            We are continuously improving Code Wolf. Here's what's coming soon:
          </p>
          <ul className="mt-6 text-2xl space-y-2 text-onyx">
            <li>
              - GitHub integration for seamless code review within your
              repositories.
            </li>
            <li>
              - Better memory optimization to handle even larger codebases
              efficiently.
            </li>
            <li>
              - Enhanced AI-powered analysis for deeper insights into code
              quality.
            </li>
            <li>
              - Customizable review settings tailored to team-specific coding
              guidelines.
            </li>
            <li>
              - More integrations with popular development tools and platforms.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
