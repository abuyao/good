// 商品数据
const products = [
    {
        id: 1,
        name: "3 ton forklift",
        description: "3 ton forklift, commission 5000 ghc, second hand",
        price: "$11000",
        category: "forklift",
        images: ["forklift30-1.jpg"]
    },
    {
        id: 2,
        name: "3.5 ton forklift",
        description: "3.5 ton forklift, commission 5000 ghc, second hand",
        price: "$15000",
        category: "forklift",
        images: ["forklift35-1.jpg", "forklift35-2.jpg"],
        videos: ["forklift35-1.mp4"]
    },
    {
        id: 3,
        name: "5 ton forklift",
        description: "5 ton forklift, commission 6000 ghc, second hand",
        price: "$20000",
        category: "forklift",
        images: ["forklift50-1.jpg", "forklift50-2.jpg", "forklift50-3.jpg"]
    },
    {
        id: 4,
        name: "excavator 21.5ton",
        description: "excavator 21.5ton, commission 5000us$, new brand Liugong",
        price: "$139000",
        category: "excavator",
        images: ["excavator215-1.jpg", "excavator215-2.jpg", "excavator215-3.jpg", "excavator215-4.jpg"]
    },
    {
        id: 5,
        name: "excavator 25ton",
        description: "excavator 25ton, commission 10000 ghc, second hand in Ghana",
        price: "$40000",
        category: "excavator",
        images: ["excavator250-1.jpg"]
    },
    {
        id: 6,
        name: "excavator 35ton",
        description: "excavator 35ton, commission 10000 ghc, second hand in Ghana",
        price: "$44000",
        category: "excavator",
        images: ["excavator350-1.jpg"]
    },
    {
        id: 7,
        name: "tricycle",
        description: "tricycle, commission 1200 ghc, for transportation ",
        price: "$2380",
        category: "tricycle",
        images: ["tricycle1-1.jpg", "tricycle1-2.jpg"]
    },
    {
        id: 8,
        name: "tricycle",
        description: "tricycle, commission 1200 ghc, for passengers ",
        price: "$2380",
        category: "tricycle",
        images: ["tricycle2-1.jpg", "tricycle2-2.jpg", "tricycle2-3.jpg"]
    }
];

// DOM元素
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.querySelector('.contact-form');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    displayProducts('all');
    setupEventListeners();
    setupSmoothScrolling();
});

// 设置事件监听器
function setupEventListeners() {
    // 筛选按钮事件
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 显示对应商品
            displayProducts(filter);
        });
    });

    // 移动端导航菜单
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接时关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 联系表单提交
    contactForm.addEventListener('submit', handleFormSubmit);

    // 滚动时导航栏效果
    window.addEventListener('scroll', handleScroll);
}

// 显示商品
function displayProducts(filter) {
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);

    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // 添加动画效果
    const cards = productsGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// 创建商品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // 构建媒体列表
    let mediaItems = [];
    
    // 添加图片
    if (product.images) {
        product.images.forEach(image => {   
        mediaItems.push({
            type: 'image',
                src: image,
                alt: product.name
            });
        });
    }
    
    // 添加视频
    if (product.videos) {
        product.videos.forEach(video => {
            mediaItems.push({
                type: 'video',
                src: video,
                poster: product.image
            });
        });
    }
    
    // 构建媒体轮播
    let mediaContent = '';
    if (mediaItems.length > 1) {
        // 多个媒体文件，创建轮播
        mediaContent = `
            <div class="media-carousel">
                <div class="media-container">
                    ${mediaItems.map((item, index) => {
                        if (item.type === 'image') {
                            return `<img src="${item.src}" alt="${item.alt}" class="media-item ${index === 0 ? 'active' : ''}" loading="lazy">`;
                        } else {
                            return `<video class="media-item ${index === 0 ? 'active' : ''}" controls poster="${item.poster}" preload="metadata">
                                <source src="${item.src}" type="video/mp4">
                            </video>`;
                        }
                    }).join('')}
                </div>
                <div class="media-controls">
                    <button class="media-prev" onclick="changeMedia(this, -1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="media-next" onclick="changeMedia(this, 1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="media-indicators">
                    ${mediaItems.map((_, index) => 
                        `<span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToMedia(this, ${index})"></span>`
                    ).join('')}
                </div>
            </div>
        `;
    } else if (mediaItems.length === 1) {
        // 单个媒体文件
        const item = mediaItems[0];
        if (item.type === 'image') {
            mediaContent = `<img src="${item.src}" alt="${item.alt}" class="product-media" loading="lazy">`;
        } else {
            mediaContent = `<video class="product-media" controls poster="${item.poster}" preload="metadata">
                <source src="${item.src}" type="video/mp4">
            </video>`;
        }
    }
    
    card.innerHTML = `
        <div class="product-image">
            ${mediaContent}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price}</div>
        </div>
    `;
    
    // 添加媒体加载处理
    const productImage = card.querySelector('.product-image');
    const mediaElements = card.querySelectorAll('.media-item, .product-media');
    
    if (mediaElements.length > 0) {
        // 显示加载状态
        productImage.classList.add('loading');
        
        let loadedCount = 0;
        const totalMedia = mediaElements.length;
        
        mediaElements.forEach(media => {
            // 媒体加载完成
            media.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === totalMedia) {
                    productImage.classList.remove('loading');
                }
            });
            
            // 媒体加载错误处理
            media.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === totalMedia) {
                    productImage.classList.remove('loading');
                }
                console.warn(`Failed to load media for product: ${product.name}`);
            });
        });
    }
    
    return card;
}

// 显示通知
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;
    
    // Simple form validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent! We will reply to you as soon as possible.');
    e.target.reset();
}

// 处理滚动事件
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// 平滑滚动
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    .product-card.fade-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .notification.error {
        background: #e74c3c !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// 搜索功能（可选）
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// 媒体轮播控制函数
function changeMedia(button, direction) {
    const carousel = button.closest('.media-carousel');
    const container = carousel.querySelector('.media-container');
    const items = carousel.querySelectorAll('.media-item');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    items.forEach((item, index) => {
        if (item.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // 计算下一个索引
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) {
        nextIndex = items.length - 1;
    } else if (nextIndex >= items.length) {
        nextIndex = 0;
    }
    
    // 更新显示
    items[currentIndex].classList.remove('active');
    items[nextIndex].classList.add('active');
    indicators[currentIndex].classList.remove('active');
    indicators[nextIndex].classList.add('active');
    
    // 暂停当前视频
    const currentVideo = items[currentIndex].querySelector('video');
    if (currentVideo) {
        currentVideo.pause();
    }
}

// 跳转到指定媒体
function goToMedia(indicator, index) {
    const carousel = indicator.closest('.media-carousel');
    const items = carousel.querySelectorAll('.media-item');
    const indicators = carousel.querySelectorAll('.indicator');
    
    // 移除所有活动状态
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // 设置新的活动状态
    items[index].classList.add('active');
    indicator.classList.add('active');
    
    // 暂停其他视频
    items.forEach((item, i) => {
        if (i !== index) {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
}

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 添加触摸滑动支持
    addTouchSupport();
});

// 添加触摸滑动支持
function addTouchSupport() {
    document.querySelectorAll('.media-carousel').forEach(carousel => {
        let startX = 0;
        let startY = 0;
        let isScrolling = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                isScrolling = true;
                e.preventDefault();
            }
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (!isScrolling) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // 最小滑动距离
                if (diffX > 0) {
                    // 向左滑动，显示下一个
                    const nextBtn = carousel.querySelector('.media-next');
                    if (nextBtn) changeMedia(nextBtn, 1);
                } else {
                    // 向右滑动，显示上一个
                    const prevBtn = carousel.querySelector('.media-prev');
                    if (prevBtn) changeMedia(prevBtn, -1);
                }
            }
        });
    });
} 