import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Cases from './components/Cases';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main>
                <Hero />
                <Solutions />
                <Cases />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
