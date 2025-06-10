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
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
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
    
    // Get modal elements
    const modalContent = modal.querySelector('.image-modal-content');
    const modalImg = modal.querySelector('img');
    const modalInfo = modal.querySelector('.image-modal-info');
    const modalClose = modal.querySelector('.image-modal-close');
    const modalPrev = modal.querySelector('.image-modal-prev');
    const modalNext = modal.querySelector('.image-modal-next');
    const modalLoading = modal.querySelector('.image-modal-loading');
    
    // Get all images and mermaid diagrams in post content
    const images = document.querySelectorAll('.post-content img, .page-content img');
    const mermaidDiagrams = document.querySelectorAll('.post-content pre.mermaid, .page-content pre.mermaid');
    
    let currentImageIndex = 0;
    let imageList = Array.from(images);
    let diagramList = Array.from(mermaidDiagrams);
    let allMediaList = [...imageList, ...diagramList];
    
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
    mermaidDiagrams.forEach((diagram, index) => {
        diagram.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = imageList.length + index; // Offset by image count
            openModal(diagram, 'mermaid');
        });
        
        // Add keyboard accessibility
        diagram.setAttribute('tabindex', '0');
        diagram.setAttribute('role', 'button');
        diagram.setAttribute('aria-label', 'Click to enlarge diagram');
        
        diagram.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
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
            
            // Create mermaid content container
            const mermaidContent = document.createElement('div');
            mermaidContent.className = 'mermaid-content';
            mermaidContent.innerHTML = element.innerHTML;
            
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
}
