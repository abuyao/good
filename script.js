// 商品数据
const products = [
    {
        id: 1,
        name: "3 ton forklift",
        description: "3 ton forklift, commission 5000 ghc, second hand",
        price: "$11000",
        category: "forklift",
        icon: "📱"
    },
    {
        id: 2,
        name: "3.5 ton forklift",
        description: "3.5 ton forklift, commission 5000 ghc, second hand",
        price: "$15000",
        category: "forklift",
        icon: "🎧"
    },
    {
        id: 3,
        name: "5 ton forklift",
        description: "5 ton forklift, commission 6000 ghc, second hand",
        price: "$20000",
        category: "forklift",
        icon: "💻"
    },
    {
        id: 4,
        name: "excavator 21.5ton",
        description: "excavator 21.5ton, commission 5000us$, new brand Liugong",
        price: "$139000",
        category: "excavator",
        icon: "👕"
    },
    {
        id: 5,
        name: "excavator 25ton",
        description: "excavator 25ton, commission 10000 ghc, second hand in Ghana",
        price: "$40000",
        category: "excavator",
        icon: "👖"
    },
    {
        id: 6,
        name: "excavator 35ton",
        description: "excavator 35ton, commission 10000 ghc, second hand in Ghana",
        price: "$44000",
        category: "excavator",
        icon: "👟"
    },
    {
        id: 7,
        name: "tricycle",
        description: "tricycle, commission 1200 ghc, for transportation ",
        price: "$2380",
        category: "tricycle",
        icon: "💡"
    },
    {
        id: 8,
        name: "tricycle",
        description: "tricycle, commission 1200 ghc, for passengers ",
        price: "$2380",
        category: "tricycle",
        icon: "☕"
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
    card.innerHTML = `
        <div class="product-image">
            <span style="font-size: 4rem;">${product.icon}</span>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price}</div>
        </div>
    `;
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
    
    // 简单的表单验证
    if (!name || !email || !message) {
        showNotification('请填写所有必填字段！', 'error');
        return;
    }
    
    // 模拟表单提交
    showNotification('消息已发送！我们会尽快回复您。');
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

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 