/* ============================================================
   艺鸿展览公司官网 — 主 JavaScript
   ============================================================ */

/* ==================== 导航功能 ==================== */
document.addEventListener('DOMContentLoaded', function() {
    initNav();
    initScrollAnimations();
    initFilterBar();
    initFloatBar();
    initCurrentPage();
    initFaqAccordion();
});

/* 导航栏滚动效果 + 移动端菜单 */
function initNav() {
    const header = document.querySelector('.header');
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (toggle) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            document.body.classList.toggle('nav-open');
        });

        /* 点击导航链接后关闭菜单 */
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                document.body.classList.remove('nav-open');
            });
        });
    }
}

/* ==================== 滚动动画 ==================== */
function initScrollAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in');

    if (fadeEls.length === 0) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeEls.forEach(function(el) {
        observer.observe(el);
    });
}

/* ==================== 案例筛选功能 ==================== */
function initFilterBar() {
    const filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;

    /* 筛选按钮点击事件（事件委托） */
    filterBar.addEventListener('click', function(e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        /* 更新按钮状态 */
        filterBar.querySelectorAll('.filter-btn').forEach(function(b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        const category = btn.dataset.filter || 'all';
        const cards = document.querySelectorAll('.case-card');

        cards.forEach(function(card) {
            if (category === 'all') {
                card.style.display = '';
            } else if (card.dataset.category === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/* ==================== 浮动侧边栏 ==================== */
function initFloatBar() {
    const floatBar = document.querySelector('.float-bar');
    if (!floatBar) return;

    /* 微信按钮点击 - 显示微信号 */
    const wechatBtn = floatBar.querySelector('.float-btn.wechat');
    if (wechatBtn) {
        wechatBtn.addEventListener('click', function() {
            alert('微信号：13850000033\n\n请复制微信号添加好友咨询');
        });
    }

    /* 电话号码点击 - 拨打电话（移动端） */
    const phoneBtn = floatBar.querySelector('.float-btn.phone');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function() {
            const phone = '13850000033';
            if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
                window.location.href = 'tel:' + phone.replace(/-/g, '');
            } else {
                alert('咨询电话：' + phone);
            }
        });
    }
}

/* ==================== 高亮当前页面 ==================== */
function initCurrentPage() {
    const page = document.body.dataset.page || '';
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (page === 'index.html' && href === '/') {
            link.classList.add('active');
        }
    });
}

/* ==================== FAQ手风琴 ==================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            /* 关闭所有FAQ */
            faqItems.forEach(function(i) {
                i.classList.remove('active');
            });

            /* 如果当前没激活，则打开它 */
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ====================
   注意：价格数据已从网站前端移除
   报价页改为「需求提交」表单
   内部价格库请使用桌面上的 Excel报价系统_v2.xlsx
   ==================== */
