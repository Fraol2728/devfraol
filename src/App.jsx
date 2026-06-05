import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Background3D,
  Navbar,
  Footer,
  Loading,
  ErrorBoundary,
} from "@/components/index";
import { useSEO } from "@/hooks/useSEO";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Education = lazy(() => import("./pages/Education"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AppLayout() {
  useSEO();

  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary fallback={null}>
        <Background3D />
      </ErrorBoundary>
      <Navbar />
      <main className="flex-grow">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
