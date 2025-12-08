/**
 * Animation utility functions for charts and UI elements
 */

/**
 * Easing functions for smooth animations
 */
export const easingFunctions = {
  easeInOut: (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeOut: (t: number): number => {
    return t * (2 - t);
  },
  easeIn: (t: number): number => {
    return t * t;
  },
};

/**
 * Animate a value from start to end over duration
 */
export const animateValue = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void,
  easing: (t: number) => number = easingFunctions.easeOut
): void => {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const currentValue = start + (end - start) * easedProgress;
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      callback(end);
    }
  };
  
  requestAnimationFrame(animate);
};

/**
 * Create animated pie chart data
 */
export const createAnimatedPieData = (
  data: Array<{ name: string; value: number; color: string }>,
  duration: number = 1000
): Promise<Array<{ name: string; value: number; color: string; animatedValue: number }>> => {
  return new Promise((resolve) => {
    const animatedData = data.map((item) => ({
      ...item,
      animatedValue: 0,
    }));

    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      animatedData.forEach((item, index) => {
        item.animatedValue = data[index].value * easingFunctions.easeOut(progress);
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        animatedData.forEach((item, index) => {
          item.animatedValue = data[index].value;
        });
        resolve(animatedData);
      }
    };
    
    requestAnimationFrame(animate);
  });
};

/**
 * Pulse animation for district borders
 */
export const createPulseAnimation = (
  element: HTMLElement,
  duration: number = 1000
): void => {
  const startTime = performance.now();
  const baseWidth = 2;
  const maxWidth = 4;
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = (elapsed % duration) / duration;
    const pulse = Math.sin(progress * Math.PI * 2);
    const width = baseWidth + (maxWidth - baseWidth) * Math.abs(pulse);
    
    if (element) {
      element.style.strokeWidth = `${width}px`;
    }
    
    requestAnimationFrame(animate);
  };
  
  requestAnimationFrame(animate);
};

/**
 * Bounce animation for markers
 */
export const createBounceAnimation = (
  element: HTMLElement,
  duration: number = 600
): void => {
  const startTime = performance.now();
  const startY = 0;
  const bounceHeight = 10;
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    if (progress < 1) {
      const bounce = Math.sin(progress * Math.PI) * bounceHeight * (1 - progress);
      const translateY = startY - bounce;
      
      if (element) {
        element.style.transform = `translateY(${translateY}px)`;
      }
      
      requestAnimationFrame(animate);
    } else {
      if (element) {
        element.style.transform = `translateY(${startY}px)`;
      }
    }
  };
  
  requestAnimationFrame(animate);
};

/**
 * Fade in animation
 */
export const fadeIn = (
  element: HTMLElement,
  duration: number = 300
): void => {
  element.style.opacity = "0";
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  
  requestAnimationFrame(() => {
    element.style.opacity = "1";
  });
};

/**
 * Fade out animation
 */
export const fadeOut = (
  element: HTMLElement,
  duration: number = 300
): Promise<void> => {
  return new Promise((resolve) => {
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.opacity = "0";
    
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

