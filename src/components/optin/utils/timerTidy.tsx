import gsap from 'gsap';

// Cleanup and remove content elements from DOM
const timerTidy = (time: number): void => {
  const componentContainer = gsap.utils.selector('.opt-in');
  const contentElements = componentContainer(':not(.timer, .timer *)');

  // If timer is already completed remove elements from DOM else animate out and then remove elements from DOM (use case: if user watches timer until end for smooth transition)
  if (time < 0) {
    contentElements.forEach((el: Element) => {
      el.remove();
    });
  } else {
    // Define GSAP timeline and set animation defaults to avoid repetition
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: 'power2.out' },
    });
    // Start animation
    tl.to(
      contentElements,
      {
        duration: 0,
        pointerEvents: 'none',
      },
      'start'
    )
      .to(
        contentElements,
        {
          opacity: 0,
        },
        'start'
      )
      .to(
        contentElements,
        {
          height: 0,
          overflow: 'hidden',
          onComplete: () => {
            contentElements.forEach((el: Element) => {
              el.remove();
            });
          },
        },
        '+0.3'
      );
  }
};

export default timerTidy;
