import Hero from './components/hero';
import Nav from './components/nav';
import Welcome from './components/welcome';
import Vision from './components/vision';
import Mission from './components/mission';
import PrincipalMessage from './components/principalmessage';
import Footer from './components/footer';
import ManagingDirector from './components/managingdirector';
export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <Hero />
      <Welcome/>
      
      <PrincipalMessage/>
      <ManagingDirector/>
      <Vision/>
      <Mission/>
      <Footer/>
    </div>
  );
}