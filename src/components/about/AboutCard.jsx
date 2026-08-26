import { useEffect, useRef } from 'react';
import VanillaTilt from '../../utils/vanilla-tilt.js';

function AboutCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    // Only initialize tilt on non-touch devices
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
    
    if (cardRef.current && !isTouchDevice) {
      VanillaTilt.init(cardRef.current, {
        max: 10,
        speed: 100,
        perspective: 2000,
        glare: true,
        'max-glare': 0.8
      });
    }

    // Cleanup
    return () => {
      if (cardRef.current && cardRef.current.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="About-Card">
      <div className="content-parallax">
        <div className="personal-image">
          <img src="/tgunn2@nd.edu-1.jpg" alt="Timothy Gunn" />
        </div>
        <div className="bio">
          <h3>About me</h3>
          <p>
            My name is Tim Gunn, and I am a recent computer science graduate from the University of Notre Dame. My interests include low latency systems and machine learning, specifically reinforcement learning, 
            and I've explored both through personal projects as well as through research at Notre Dame. 
            When I’m not coding, you’ll usually find me in the gym, playing basketball with friends, or watching Cardinals baseball.
          </p>
          <h3>Contact</h3>
          <p>
            If you have any questions or would like to collaborate feel free to contact me at: timgunn815@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;