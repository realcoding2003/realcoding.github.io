// Main JavaScript functionality for the blog

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initThemeToggle();
    initScrollToTop();
    initSmoothScrolling();
    initImageModal();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Legacy support
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // New mobile menu
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Animate hamburger menu
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            if (mainNav.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lines[0].style.transform = '';
                lines[1].style.opacity = '';
                lines[2].style.transform = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
                const lines = mobileToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = '';
                lines[1].style.opacity = '';
                lines[2].style.transform = '';
            }
        });
    }
    
    // Legacy navbar menu support
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navbarToggle.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
                navbarMenu.classList.remove('active');
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    // 라이트모드를 기본값으로 설정
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px var(--shadow);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px var(--shadow)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 4px 15px var(--shadow)';
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add reading progress bar for posts
function initReadingProgress() {
    if (document.querySelector('.post-content')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', debounce(function() {
            const article = document.querySelector('.post-content');
            if (article) {
                const articleTop = article.offsetTop;
                const articleHeight = article.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                
                const progress = Math.min(
                    Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
                    1
                );
                
                progressBar.style.width = (progress * 100) + '%';
            }
        }, 10));
    }
}

// Initialize reading progress on post pages
if (document.querySelector('.post-content')) {
    initReadingProgress();
}

// Copy to clipboard functionality (for code blocks)
function initCodeCopyButtons() {
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        const pre = codeBlock.parentNode;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #e2e8f0;
            padding: 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        pre.addEventListener('mouseenter', function() {
            copyBtn.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', function() {
            copyBtn.style.opacity = '0';
        });
        
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.style.background = 'rgba(34, 197, 94, 0.2)';
                
                setTimeout(function() {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });
    });
}

// Initialize code copy buttons if code blocks exist
if (document.querySelectorAll('pre code').length > 0) {
    initCodeCopyButtons();
}

// Image Modal functionality
function initImageModal() {
    console.log('Initializing image modal...');
    
    // Create modal elements first
    createImageModal();
    
    // Multiple initialization attempts for timing issues
    function trySetupListeners(attemptNumber = 1) {
        console.log(`Setup attempt ${attemptNumber}`);
        setupImageModalListeners();
        
        // Try again if no mermaid diagrams found and we haven't tried too many times
        const mermaidElements = document.querySelectorAll('.mermaid, pre.mermaid, div.mermaid');
        console.log(`Found ${mermaidElements.length} mermaid elements on attempt ${attemptNumber}`);
        
        if (mermaidElements.length === 0 && attemptNumber < 5) {
            setTimeout(() => trySetupListeners(attemptNumber + 1), 500 * attemptNumber);
        }
    }
    
    // Initial setup
    trySetupListeners();
    
    // Also setup a mutation observer to detect when new mermaid elements are added
    const observer = new MutationObserver(function(mutations) {
        let shouldReinitialize = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.classList && (node.classList.contains('mermaid') || node.tagName === 'PRE' && node.classList.contains('mermaid'))) {
                            console.log('New mermaid element detected:', node);
                            shouldReinitialize = true;
                        } else if (node.querySelector && node.querySelector('.mermaid, pre.mermaid')) {
                            console.log('Container with mermaid elements detected:', node);
                            shouldReinitialize = true;
                        }
                    }
                });
            }
        });
        
        if (shouldReinitialize) {
            // Clear the old listeners flag to allow re-setup
            const modal = document.getElementById('imageModal');
            if (modal) {
                modal.removeAttribute('data-listeners-added');
            }
            
            setTimeout(() => {
                console.log('Re-initializing after mutation...');
                setupImageModalListeners();
            }, 200);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'data-processed']
    });
}

function createImageModal() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.id = 'imageModal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <button class="image-modal-close" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <button class="image-modal-nav image-modal-prev" aria-label="Previous image">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="image-modal-nav image-modal-next" aria-label="Next image">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="image-modal-loading">
                <div class="image-modal-spinner"></div>
                <div>Loading...</div>
            </div>
            <img src="" alt="" />
            <div class="image-modal-info"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function setupImageModalListeners() {
    // Get existing modal elements
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.image-modal-content');
    const modalImg = modal.querySelector('img');
    const modalInfo = modal.querySelector('.image-modal-info');
    const modalClose = modal.querySelector('.image-modal-close');
    const modalPrev = modal.querySelector('.image-modal-prev');
    const modalNext = modal.querySelector('.image-modal-next');
    const modalLoading = modal.querySelector('.image-modal-loading');
    
    // Remove existing listeners to prevent duplicates
    const oldListeners = modal.getAttribute('data-listeners-added');
    if (oldListeners === 'true') return;

    // Get all images and mermaid diagrams in post content
    const images = document.querySelectorAll('.post-content img, .page-content img');
    
    // Try multiple selectors for mermaid diagrams
    const mermaidSelectors = [
        '.post-content pre.mermaid[data-processed="true"]',
        '.page-content pre.mermaid[data-processed="true"]',
        '.post-content .mermaid[data-processed="true"]',
        '.page-content .mermaid[data-processed="true"]',
        '.post-content div.mermaid',
        '.page-content div.mermaid',
        '.post-content pre.mermaid',
        '.page-content pre.mermaid'
    ];
    
    let mermaidDiagrams = [];
    mermaidSelectors.forEach(selector => {
        const found = document.querySelectorAll(selector);
        if (found.length > 0) {
            console.log(`Found ${found.length} mermaid diagrams with selector: ${selector}`);
            mermaidDiagrams = [...mermaidDiagrams, ...Array.from(found)];
        }
    });
    
    // Remove duplicates
    mermaidDiagrams = Array.from(new Set(mermaidDiagrams));
    
    // Debug logging
    console.log('Image modal setup - Images found:', images.length);
    console.log('Image modal setup - Mermaid diagrams found:', mermaidDiagrams.length);
    mermaidDiagrams.forEach((diagram, index) => {
        console.log(`Mermaid ${index}:`, diagram.outerHTML.substring(0, 200) + '...');
    });
    
    let currentImageIndex = 0;
    let imageList = Array.from(images);
    let diagramList = Array.from(mermaidDiagrams).filter(diagram => {
        const hasSvg = diagram.querySelector('svg');
        console.log(`Diagram ${diagram.className} has SVG:`, hasSvg);
        return hasSvg;
    });
    let allMediaList = [...imageList, ...diagramList];
    
    console.log('Final media list length:', allMediaList.length);
    
    if (allMediaList.length === 0) return;
    
    // Add click listeners to images
    images.forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = index;
            openModal(img, 'image');
        });
        
        // Add keyboard accessibility
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Click to enlarge image');
        
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentImageIndex = index;
                openModal(img, 'image');
            }
        });
    });
    
    // Add click listeners to mermaid diagrams
    diagramList.forEach((diagram, index) => {
        console.log(`Adding click listener to mermaid diagram ${index}:`, diagram);
        
        // Add visual cursor pointer
        diagram.style.cursor = 'pointer';
        
        diagram.addEventListener('click', function(e) {
            console.log('Mermaid diagram clicked!', diagram);
            e.preventDefault();
            e.stopPropagation();
            currentImageIndex = imageList.length + index; // Offset by image count
            openModal(diagram, 'mermaid');
        });
        
        // Add keyboard accessibility
        diagram.setAttribute('tabindex', '0');
        diagram.setAttribute('role', 'button');
        diagram.setAttribute('aria-label', 'Click to enlarge diagram');
        
        diagram.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('Mermaid diagram keyboard activated!', diagram);
                e.preventDefault();
                currentImageIndex = imageList.length + index;
                openModal(diagram, 'mermaid');
            }
        });
    });
    
    // Open modal function
    function openModal(element, type) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Show loading
        modalLoading.style.display = 'block';
        modalImg.style.display = 'none';
        
        // Clear any existing mermaid content
        const existingMermaidContent = modal.querySelector('.mermaid-content');
        if (existingMermaidContent) {
            existingMermaidContent.remove();
        }
        
        if (type === 'image') {
            // Handle regular images
            const tempImg = new Image();
            tempImg.onload = function() {
                modalImg.src = element.src;
                modalImg.alt = element.alt || 'Enlarged image';
                modalInfo.textContent = element.alt || 'Image';
                
                modalLoading.style.display = 'none';
                modalImg.style.display = 'block';
                
                // Add active class for animation
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            };
            
            tempImg.onerror = function() {
                modalLoading.style.display = 'none';
                modalInfo.textContent = 'Failed to load image';
                modal.classList.add('active');
            };
            
            tempImg.src = element.src;
            
        } else if (type === 'mermaid') {
            // Handle mermaid diagrams
            modalImg.style.display = 'none';
            
            // Create mermaid content container with zoom controls
            const mermaidContent = document.createElement('div');
            mermaidContent.className = 'mermaid-content';
            
            // Copy the SVG content
            const originalSvg = element.querySelector('svg');
            if (originalSvg) {
                const clonedSvg = originalSvg.cloneNode(true);
                
                // Set initial zoom properties with larger base size
                clonedSvg.style.width = 'auto';
                clonedSvg.style.height = 'auto';
                clonedSvg.style.minWidth = '600px';
                clonedSvg.style.minHeight = '400px';
                clonedSvg.style.maxWidth = '80vw';
                clonedSvg.style.maxHeight = '70vh';
                clonedSvg.style.transition = 'transform 0.3s ease';
                clonedSvg.style.transform = 'scale(1)';
                clonedSvg.setAttribute('data-zoom', '1');
                
                // Remove any existing width/height attributes that might constrain size
                clonedSvg.removeAttribute('width');
                clonedSvg.removeAttribute('height');
                
                // Set viewBox if not present for better scaling
                if (!clonedSvg.getAttribute('viewBox')) {
                    const bbox = originalSvg.getBBox ? originalSvg.getBBox() : {x: 0, y: 0, width: 800, height: 600};
                    clonedSvg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
                }
                
                mermaidContent.appendChild(clonedSvg);
                
                // Add zoom controls
                const zoomControls = document.createElement('div');
                zoomControls.className = 'mermaid-zoom-controls';
                zoomControls.innerHTML = `
                    <button class="zoom-btn zoom-in" title="확대">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="zoom-btn zoom-out" title="축소">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button class="zoom-btn zoom-reset" title="원본 크기">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                `;
                
                mermaidContent.appendChild(zoomControls);
                
                // Add zoom functionality
                let currentZoom = 1;
                const zoomStep = 0.2;
                const minZoom = 0.5;
                const maxZoom = 3;
                
                // Drag functionality variables
                let isDragging = false;
                let dragStartX = 0;
                let dragStartY = 0;
                let translateX = 0;
                let translateY = 0;
                let startTranslateX = 0;
                let startTranslateY = 0;
                
                const zoomInBtn = zoomControls.querySelector('.zoom-in');
                const zoomOutBtn = zoomControls.querySelector('.zoom-out');
                const zoomResetBtn = zoomControls.querySelector('.zoom-reset');
                
                function updateZoom(newZoom) {
                    currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
                    
                    // Ensure smooth transition for zoom operations (not during drag)
                    if (!isDragging && !isTouchDragging) {
                        clonedSvg.style.transition = 'transform 0.3s ease-out';
                    }
                    
                    updateTransform();
                    
                    // Update button states
                    zoomInBtn.disabled = currentZoom >= maxZoom;
                    zoomOutBtn.disabled = currentZoom <= minZoom;
                    
                    // Reset position when zooming out to 1x or less
                    if (currentZoom <= 1) {
                        translateX = 0;
                        translateY = 0;
                        updateTransform();
                    }
                    
                    // Update cursor based on zoom level
                    if (currentZoom > 1) {
                        clonedSvg.style.cursor = 'grab';
                    } else {
                        clonedSvg.style.cursor = 'default';
                    }
                }
                
                function updateTransform() {
                    clonedSvg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
                    clonedSvg.setAttribute('data-zoom', currentZoom);
                }
                
                zoomInBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateZoom(currentZoom + zoomStep);
                });
                
                zoomOutBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateZoom(currentZoom - zoomStep);
                });
                
                zoomResetBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    translateX = 0;
                    translateY = 0;
                    updateZoom(1);
                });
                
                // Mouse wheel zoom
                mermaidContent.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
                    updateZoom(currentZoom + delta);
                });
                
                // Drag functionality for mouse
                clonedSvg.addEventListener('mousedown', (e) => {
                    if (currentZoom > 1) {
                        isDragging = true;
                        dragStartX = e.clientX;
                        dragStartY = e.clientY;
                        startTranslateX = translateX;
                        startTranslateY = translateY;
                        clonedSvg.style.cursor = 'grabbing';
                        // Disable transition for immediate response during drag
                        clonedSvg.style.transition = 'none';
                        e.preventDefault();
                    }
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (isDragging && currentZoom > 1) {
                        e.preventDefault();
                        const deltaX = e.clientX - dragStartX;
                        const deltaY = e.clientY - dragStartY;
                        translateX = startTranslateX + deltaX;
                        translateY = startTranslateY + deltaY;
                        updateTransform();
                    }
                });
                
                document.addEventListener('mouseup', () => {
                    if (isDragging) {
                        isDragging = false;
                        // Re-enable transition after drag ends
                        clonedSvg.style.transition = 'transform 0.1s ease-out';
                        if (currentZoom > 1) {
                            clonedSvg.style.cursor = 'grab';
                        } else {
                            clonedSvg.style.cursor = 'default';
                        }
                    }
                });
                
                // Touch/pinch zoom and drag for mobile
                let initialDistance = 0;
                let initialZoom = 1;
                let touchStartX = 0;
                let touchStartY = 0;
                let isTouchDragging = false;
                let touchStartTranslateX = 0;
                let touchStartTranslateY = 0;
                
                clonedSvg.addEventListener('touchstart', (e) => {
                    if (e.touches.length === 1 && currentZoom > 1) {
                        // Single touch drag
                        isTouchDragging = true;
                        touchStartX = e.touches[0].clientX;
                        touchStartY = e.touches[0].clientY;
                        touchStartTranslateX = translateX;
                        touchStartTranslateY = translateY;
                        // Disable transition for immediate response during touch drag
                        clonedSvg.style.transition = 'none';
                        e.preventDefault();
                    } else if (e.touches.length === 2) {
                        // Two finger pinch zoom
                        isTouchDragging = false;
                        initialDistance = Math.hypot(
                            e.touches[0].pageX - e.touches[1].pageX,
                            e.touches[0].pageY - e.touches[1].pageY
                        );
                        initialZoom = currentZoom;
                        e.preventDefault();
                    }
                });
                
                clonedSvg.addEventListener('touchmove', (e) => {
                    if (e.touches.length === 1 && isTouchDragging && currentZoom > 1) {
                        // Single touch drag
                        e.preventDefault();
                        const deltaX = e.touches[0].clientX - touchStartX;
                        const deltaY = e.touches[0].clientY - touchStartY;
                        translateX = touchStartTranslateX + deltaX;
                        translateY = touchStartTranslateY + deltaY;
                        updateTransform();
                    } else if (e.touches.length === 2) {
                        // Two finger pinch zoom
                        e.preventDefault();
                        const distance = Math.hypot(
                            e.touches[0].pageX - e.touches[1].pageX,
                            e.touches[0].pageY - e.touches[1].pageY
                        );
                        const scale = distance / initialDistance;
                        updateZoom(initialZoom * scale);
                    }
                });
                
                clonedSvg.addEventListener('touchend', () => {
                    if (isTouchDragging) {
                        // Re-enable transition after touch drag ends
                        clonedSvg.style.transition = 'transform 0.1s ease-out';
                    }
                    isTouchDragging = false;
                });
            }
            
            modalContent.appendChild(mermaidContent);
            
            modalInfo.textContent = 'Mermaid Diagram';
            modalLoading.style.display = 'none';
            
            // Add active class for animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
        
        // Show/hide navigation buttons
        updateNavigationButtons();
        
        // Focus management for accessibility
        modalClose.focus();
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modalImg.src = '';
            
            // Clean up mermaid content
            const existingMermaidContent = modal.querySelector('.mermaid-content');
            if (existingMermaidContent) {
                existingMermaidContent.remove();
            }
        }, 300);
    }
    
    // Update navigation buttons visibility
    function updateNavigationButtons() {
        if (allMediaList.length <= 1) {
            modalPrev.style.display = 'none';
            modalNext.style.display = 'none';
        } else {
            modalPrev.style.display = 'flex';
            modalNext.style.display = 'flex';
            
            // Disable buttons at boundaries
            modalPrev.style.opacity = currentImageIndex === 0 ? '0.3' : '0.7';
            modalNext.style.opacity = currentImageIndex === allMediaList.length - 1 ? '0.3' : '0.7';
            modalPrev.disabled = currentImageIndex === 0;
            modalNext.disabled = currentImageIndex === allMediaList.length - 1;
        }
    }
    
    // Navigation functions
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const element = allMediaList[currentImageIndex];
            const type = currentImageIndex < imageList.length ? 'image' : 'mermaid';
            openModal(element, type);
        }
    }
    
    function showNextImage() {
        if (currentImageIndex < allMediaList.length - 1) {
            currentImageIndex++;
            const element = allMediaList[currentImageIndex];
            const type = currentImageIndex < imageList.length ? 'image' : 'mermaid';
            openModal(element, type);
        }
    }
    
    // Event listeners
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrevImage);
    modalNext.addEventListener('click', showNextImage);
    
    // Close modal when clicking outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Prevent closing when clicking on modal content
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                showPrevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                showNextImage();
                break;
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - show next image
                showNextImage();
            } else {
                // Swipe right - show previous image
                showPrevImage();
            }
        }
    }
    
    // Prevent scrolling when modal is open
    modal.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Mark listeners as added
    modal.setAttribute('data-listeners-added', 'true');
}
