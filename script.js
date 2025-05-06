        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navbar = document.querySelector('.navbar');
        
        // Check window width and apply appropriate classes
        function checkWindowSize() {
            if (window.innerWidth <= 768) {
                navbar.classList.add('mobile');
            } else {
                navbar.classList.remove('mobile');
                navbar.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
        
        // Run on page load
        checkWindowSize();
        
        // Run on window resize
        window.addEventListener('resize', checkWindowSize);
        
        // Toggle menu on click
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link (mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navbar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
        
        // Highlight current page in navigation
        document.addEventListener('DOMContentLoaded', () => {
            const currentPage = window.location.pathname.split('/').pop();
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle functionality
            const menuToggle = document.querySelector('.menu-toggle');
            const navbar = document.querySelector('.navbar');
            
            menuToggle.addEventListener('click', function() {
                menuToggle.classList.toggle('active');
                navbar.classList.toggle('active');
            });
            
            // Custom cursor
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            
            document.addEventListener('mousemove', function(e) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                // Add a slight delay to follower
                setTimeout(function() {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 50);
            });
            
            document.addEventListener('mousedown', function() {
                cursor.style.transform = 'scale(0.8)';
                cursorFollower.style.transform = 'scale(1.2)';
            });
            
            document.addEventListener('mouseup', function() {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
            
            // Add hover effect to all links
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    cursor.style.transform = 'scale(1.5)';
                    cursorFollower.style.transform = 'scale(0.8)';
                });
                
                link.addEventListener('mouseleave', function() {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
            
            // Create and animate letter A's
            const letterContainer = document.getElementById('letter-container');
            const letterCount = 15; // More letters for enhanced wow effect
            const letters = [];
            const rotations = [];
            const draggedLetter = { element: null, offsetX: 0, offsetY: 0 };
            
            for (let i = 0; i < letterCount; i++) {
                const letter = document.createElement('img');
                letter.src = 'media/a-letter.png'; // Replace with your actual image path
                letter.classList.add('a-letter');
                letter.dataset.index = i;
                
                // Random size between 100px and 400px
                const size = 100 + Math.random() * 300;
                letter.style.width = `${size}px`;
                letter.style.height = `${size}px`;
                
                // Random position
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                letter.style.left = `${x}%`;
                letter.style.top = `${y}%`;
                
                // Random opacity
                letter.style.opacity = 0.1 + Math.random() * 0.4;
                
                // Random rotation
                const rotation = Math.random() * 360;
                rotations.push(rotation);
                letter.style.transform = `rotate(${rotation}deg)`;
                
                // Random blur
                const blur = Math.random() * 5;
                letter.style.filter = `blur(${blur}px)`;
                
                // Random animation
                const duration = 20 + Math.random() * 40;
                const delay = Math.random() * -30;
                letter.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
                
                // Interactive drag functionality
                letter.addEventListener('mousedown', function(e) {
                    // Pause any animations
                    this.style.animation = 'none';
                    
                    // Make it more visible
                    this.style.opacity = '0.8';
                    this.style.zIndex = '100';
                    this.style.filter = 'blur(0px)';
                    
                    // Calculate offset
                    const rect = this.getBoundingClientRect();
                    draggedLetter.element = this;
                    draggedLetter.offsetX = e.clientX - rect.left;
                    draggedLetter.offsetY = e.clientY - rect.top;
                    
                    // Prevent default behavior
                    e.preventDefault();
                });
                
                // Double click to make letter active with pulse animation
                letter.addEventListener('dblclick', function() {
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                    } else {
                        // Remove active class from all other letters
                        document.querySelectorAll('.a-letter.active').forEach(el => {
                            el.classList.remove('active');
                        });
                        this.classList.add('active');
                        
                        // Create a burst of particles
                        createParticleBurst(this);
                    }
                });
                
                // Context menu (right click) to change color
                letter.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    const hues = [0, 30, 60, 120, 180, 240, 280, 320]; // Various colors
                    const randomHue = hues[Math.floor(Math.random() * hues.length)];
                    this.style.filter = `hue-rotate(${randomHue}deg) blur(0px)`;
                    
                    // Add a bright flash
                    this.style.animation = 'flash 0.5s';
                    setTimeout(() => {
                        this.style.animation = `float ${duration}s infinite ease-in-out`;
                    }, 500);
                    
                    return false;
                });
                
                // Hover effects with sound feedback
                letter.addEventListener('mouseenter', function() {
                    // Visual feedback
                    this.style.opacity = '0.9';
                    this.style.zIndex = '50';
                    this.style.filter = 'blur(0px)';
                    
                    // Create subtle sound effect
                    playRandomTone();
                    
                    // Create small ripple
                    createRipple(this, 'small');
                });
                
                letter.addEventListener('mouseleave', function() {
                    // Only reset if not being dragged and not active
                    if (draggedLetter.element !== this && !this.classList.contains('active')) {
                        this.style.opacity = 0.1 + Math.random() * 0.4;
                        this.style.zIndex = '1';
                        this.style.filter = `blur(${Math.random() * 5}px)`;
                    }
                });
                
                // Add wheel event for resizing
                letter.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    
                    // Get current size
                    const currentWidth = parseFloat(this.style.width);
                    
                    // Calculate new size (scale up or down)
                    let newSize;
                    if (e.deltaY < 0) {
                        // Scroll up - increase size
                        newSize = currentWidth * 1.1;
                        // Limit maximum size
                        newSize = Math.min(newSize, 600);
                    } else {
                        // Scroll down - decrease size
                        newSize = currentWidth * 0.9;
                        // Limit minimum size
                        newSize = Math.max(newSize, 50);
                    }
                    
                    // Apply new size
                    this.style.width = `${newSize}px`;
                    this.style.height = `${newSize}px`;
                    
                    // Create scaling feedback
                    this.style.transition = 'all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
                    
                    // Visual feedback
                    createRipple(this, 'tiny');
                });
                
                letterContainer.appendChild(letter);
                letters.push(letter);
            }
            
            // Mouse move handler for drag functionality
            document.addEventListener('mousemove', function(e) {
                if (draggedLetter.element) {
                    // Calculate new position
                    const x = e.clientX - draggedLetter.offsetX;
                    const y = e.clientY - draggedLetter.offsetY;
                    
                    // Apply new position (using absolute px values for smooth dragging)
                    draggedLetter.element.style.left = `${x}px`;
                    draggedLetter.element.style.top = `${y}px`;
                    
                    // Create trail effect
                    if (Math.random() > 0.7) { // Only create trails occasionally for performance
                        createTrail(x + draggedLetter.offsetX, y + draggedLetter.offsetY);
                    }
                }
            });
            
            // Mouse up handler to release dragging
            document.addEventListener('mouseup', function() {
                if (draggedLetter.element) {
                    // Reset animation if not active
                    if (!draggedLetter.element.classList.contains('active')) {
                        const index = parseInt(draggedLetter.element.dataset.index);
                        const duration = 20 + Math.random() * 40;
                        const delay = Math.random() * -30;
                        draggedLetter.element.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
                    }
                    
                    // Reset dragged letter
                    draggedLetter.element = null;
                }
            });
            
            // Function to create particle burst
            function createParticleBurst(element) {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Create 20 particles
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'absolute';
                    particle.style.width = '10px';
                    particle.style.height = '10px';
                    particle.style.borderRadius = '50%';
                    particle.style.backgroundColor = '#F8C3DA';
                    particle.style.left = `${centerX}px`;
                    particle.style.top = `${centerY}px`;
                    particle.style.zIndex = '90';
                    
                    // Random direction
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 100 + Math.random() * 100;
                    const duration = 0.5 + Math.random() * 1;
                    
                    // Set animation
                    particle.style.transition = `all ${duration}s cubic-bezier(0.18, 0.89, 0.32, 1.28)`;
                    
                    // Add to DOM
                    document.body.appendChild(particle);
                    
                    // Start animation after a small delay
                    setTimeout(() => {
                        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                        particle.style.opacity = '0';
                    }, 10);
                    
                    // Remove after animation
                    setTimeout(() => {
                        particle.remove();
                    }, duration * 1000);
                }
            }
            
            // Function to create trail effect
            function createTrail(x, y) {
                const trail = document.createElement('div');
                trail.style.position = 'absolute';
                trail.style.width = '15px';
                trail.style.height = '15px';
                trail.style.borderRadius = '50%';
                trail.style.backgroundColor = 'rgba(248, 195, 218, 0.3)';
                trail.style.left = `${x}px`;
                trail.style.top = `${y}px`;
                trail.style.zIndex = '5';
                
                // Add to DOM
                document.body.appendChild(trail);
                
                // Animate and remove
                setTimeout(() => {
                    trail.style.transition = 'all 0.8s ease';
                    trail.style.opacity = '0';
                    trail.style.transform = 'scale(0.3)';
                }, 10);
                
                setTimeout(() => {
                    trail.remove();
                }, 800);
            }
            
            
            // Advanced interactive parallax
            document.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                // Move letters with parallax effect
                const letters = document.querySelectorAll('.a-letter');
                letters.forEach((letter, index) => {
                    const depth = (index % 4) + 1; // Vary depth for different parallax levels
                    const moveX = (mouseX - 0.5) * depth * 100;
                    const moveY = (mouseY - 0.5) * depth * 100;
                    
                    letter.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
                });
                
                // Move glow effects
                const glow1 = document.getElementById('glow-1');
                const glow2 = document.getElementById('glow-2');
                
                glow1.style.opacity = '0.7';
                glow1.style.left = `${e.clientX - 150}px`;
                glow1.style.top = `${e.clientY - 150}px`;
                
                glow2.style.opacity = '0.5';
                glow2.style.left = `${e.clientX - 200}px`;
                glow2.style.top = `${e.clientY - 100}px`;
            });
            
            
            // Interactive text
            const title = document.querySelector('.section-title');
            title.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 20px rgba(204, 245, 172, 0.8)';
            });
            
            title.addEventListener('mouseleave', function() {
                this.style.textShadow = '0 0 10px rgba(248, 195, 218, 0.3)';
            });
            
            // Add scroll reveal effects
            window.addEventListener('scroll', revealOnScroll);
            
            function revealOnScroll() {
                const reveals = document.querySelectorAll('.reveal');
                
                reveals.forEach(reveal => {
                    const windowHeight = window.innerHeight;
                    const revealTop = reveal.getBoundingClientRect().top;
                    const revealPoint = 150;
                    
                    if (revealTop < windowHeight - revealPoint) {
                        reveal.classList.add('active');
                    }
                });
            }
            
            // Add 3D tilt effect to elements
            const heroContainer = document.querySelector('.hero-container');
            
            heroContainer.addEventListener('mousemove', function(e) {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                
                title.style.transform = `translateY(0) rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
                const shortIntro = document.querySelector('.short-intro');
                shortIntro.style.transform = `translateY(0) rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
            });
            
            heroContainer.addEventListener('mouseleave', function() {
                title.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
                const shortIntro = document.querySelector('.short-intro');
                shortIntro.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
            });
            
            // Add subtle letter hover interaction
            const letterAs = document.querySelectorAll('.a-letter');
            letterAs.forEach(letter => {
                letter.addEventListener('click', function() {
                    // Random color on click
                    const hue = Math.floor(Math.random() * 360);
                    this.style.filter = `blur(0px) hue-rotate(${hue}deg)`;
                    
                    // Trigger ripple effect
                    createRipple(this);
                    
                    // Reset after animation
                    setTimeout(() => {
                        this.style.filter = `blur(${Math.random() * 5}px)`;
                    }, 1000);
                });
            });
            
            function createRipple(element, size = 'normal') {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '10px';
                ripple.style.height = '10px';
                ripple.style.borderRadius = '50%';
                ripple.style.backgroundColor = '#F8C3DA';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                
                // Different sizes of ripples
                let maxSize, duration;
                switch(size) {
                    case 'small':
                        maxSize = 200;
                        duration = 0.7;
                        break;
                    case 'tiny':
                        maxSize = 50;
                        duration = 0.3;
                        break;
                    case 'large':
                        maxSize = 800;
                        duration = 1.5;
                        break;
                    default:
                        maxSize = 500;
                        duration = 1;
                }
                
                ripple.style.animation = `ripple${maxSize} ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`;
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, duration * 1000);
            }
            
            // Add interactive mode
            document.addEventListener('keydown', function(e) {
                // Press 'G' to activate gravity mode
                if (e.key.toLowerCase() === 'g') {
                    toggleGravityMode();
                }
                
                // Press 'F' for formation mode
                if (e.key.toLowerCase() === 'f') {
                    formationMode();
                }
                
                // Press 'R' to randomize positions
                if (e.key.toLowerCase() === 'r') {
                    randomizeLetters();
                }
                
                // Press 'C' to converge all letters to center
                if (e.key.toLowerCase() === 'c') {
                    convergeLetters();
                }
                
                // Press 'S' to scatter letters
                if (e.key.toLowerCase() === 's') {
                    scatterLetters();
                }
            });
            
            // Toggle gravity mode
            let gravityMode = false;
            function toggleGravityMode() {
                gravityMode = !gravityMode;
                
                const letters = document.querySelectorAll('.a-letter');
                letters.forEach(letter => {
                    // Clear existing animations
                    letter.style.animation = 'none';
                    letter.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    
                    if (gravityMode) {
                        // Move to bottom with physics-like motion
                        const delay = Math.random() * 0.5;
                        letter.style.top = '90vh';
                        letter.style.transition = `top 1.5s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`;
                    } else {
                        // Return to original position
                        const x = Math.random() * 100;
                        const y = Math.random() * 100;
                        letter.style.left = `${x}%`;
                        letter.style.top = `${y}%`;
                        
                        // Resume animation
                        const duration = 20 + Math.random() * 40;
                        letter.style.animation = `float ${duration}s infinite ease-in-out`;
                    }
                });
            }
            
            // Formation mode - arrange letters in a shape
            function formationMode() {
                const letters = document.querySelectorAll('.a-letter');
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
                
                letters.forEach((letter, index) => {
                    // Clear existing animations
                    letter.style.animation = 'none';
                    
                    // Calculate position in a circle
                    const angle = (index / letters.length) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    
                    // Apply new position with delay
                    letter.style.transition = `all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
                    letter.style.left = `${x}px`;
                    letter.style.top = `${y}px`;
                    
                    // Reset rotation for uniformity
                    letter.style.transform = 'rotate(0deg)';
                });
            }
            
            // Randomize letters
            function randomizeLetters() {
                const letters = document.querySelectorAll('.a-letter');
                
                letters.forEach(letter => {
                    // Random position
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    
                    // Random size
                    const size = 100 + Math.random() * 300;
                    
                    // Random rotation
                    const rotation = Math.random() * 360;
                    
                    // Apply with animation
                    letter.style.transition = `all 0.8s cubic-bezier(0.23, 1, 0.32, 1)`;
                    letter.style.left = `${x}%`;
                    letter.style.top = `${y}%`;
                    letter.style.width = `${size}px`;
                    letter.style.height = `${size}px`;
                    letter.style.transform = `rotate(${rotation}deg)`;
                    
                    // Random opacity
                    letter.style.opacity = 0.1 + Math.random() * 0.4;
                    
                    // Create feedback
                    createRipple(letter, 'small');
                });
            }
            
            // Converge letters to center
            function convergeLetters() {
                const letters = document.querySelectorAll('.a-letter');
                
                letters.forEach((letter, index) => {
                    // Clear existing animations
                    letter.style.animation = 'none';
                    
                    // Center position with slight offset
                    const offset = 20;
                    const offsetX = -offset + Math.random() * (offset * 2);
                    const offsetY = -offset + Math.random() * (offset * 2);
                    
                    // Apply with animation
                    letter.style.transition = `all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`;
                    letter.style.left = `calc(50% + ${offsetX}px)`;
                    letter.style.top = `calc(50% + ${offsetY}px)`;
                    
                    // Start a glow effect
                    letter.style.filter = 'blur(0px)';
                    letter.style.opacity = '0.8';
                    
                    // Create feedback
                    setTimeout(() => {
                        createRipple(letter, 'large');
                    }, index * 50 + 1000);
                });
            }
            
            // Scatter letters
            function scatterLetters() {
                const letters = document.querySelectorAll('.a-letter');
                
                letters.forEach((letter, index) => {
                    // Calculate direction from center
                    const rect = letter.getBoundingClientRect();
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const currentX = rect.left + rect.width/2;
                    const currentY = rect.top + rect.height/2;
                    
                    // Get direction vector
                    let dirX = currentX - centerX;
                    let dirY = currentY - centerY;
                    
                    // Normalize
                    const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
                    dirX /= length;
                    dirY /= length;
                    
                    // Calculate new position (far from center)
                    const distance = 1000 + Math.random() * 500;
                    const newX = centerX + dirX * distance;
                    const newY = centerY + dirY * distance;
                    
                    // Apply with quick animation
                    letter.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.03}s`;
                    letter.style.left = `${newX}px`;
                    letter.style.top = `${newY}px`;
                });
                
                // After scattering, bring them back
                setTimeout(() => {
                    randomizeLetters();
                }, 1500);
            }
            
            // Add ripple keyframes for different sizes
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes ripple50 {
                    0% { width: 0; height: 0; opacity: 0.8; }
                    100% { width: 50px; height: 50px; opacity: 0; }
                }
                @keyframes ripple200 {
                    0% { width: 0; height: 0; opacity: 0.8; }
                    100% { width: 200px; height: 200px; opacity: 0; }
                }
                @keyframes ripple500 {
                    0% { width: 0; height: 0; opacity: 0.8; }
                    100% { width: 500px; height: 500px; opacity: 0; }
                }
                @keyframes ripple800 {
                    0% { width: 0; height: 0; opacity: 0.8; }
                    100% { width: 800px; height: 800px; opacity: 0; }
                }
                @keyframes flash {
                    0% { filter: brightness(1); }
                    50% { filter: brightness(3); }
                    100% { filter: brightness(1); }
                }
            `;
            document.head.appendChild(style);
            
            // Add instructions to page
            const instructions = document.createElement('div');
            instructions.style.position = 'fixed';
            instructions.style.bottom = '20px';
            instructions.style.left = '50%';
            instructions.style.transform = 'translateX(-50%)';
            instructions.style.color = '#F8C3DA';
            instructions.style.fontSize = '14px';
            instructions.style.opacity = '0.7';
            instructions.style.textAlign = 'center';
            instructions.style.transition = 'opacity 0.3s';
            instructions.innerHTML = `
                <p style="margin-left:150px; font-size:18px;">Interact with the A's</p>
                <p style="margin-left:150px; font-size:18px;">Keyboard: [G]ravity, [F]ormation, [R]andomize, [C]onverge, [S]catter</p>
            `;
            
            // Show/hide instructions
            instructions.addEventListener('mouseenter', () => {
                instructions.style.opacity = '1';
            });
            
            instructions.addEventListener('mouseleave', () => {
                instructions.style.opacity = '0.7';
            });
            
            document.body.appendChild(instructions);
        });