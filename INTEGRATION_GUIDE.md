# Portfolio Demo System - Integration Guide

## Overview

The Portfolio Demo System provides lightweight, embeddable components that can be easily integrated into existing landing pages with minimal performance impact. This guide covers all integration methods, customization options, and best practices.

## Quick Start

### 1. Basic Integration

Add the following files to your landing page:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Portfolio Demo CSS -->
    <link rel="stylesheet" href="path/to/portfolio-demo/assets/css/embed.css">
</head>
<body>
    <!-- Portfolio Container -->
    <div id="portfolio-embed" 
         data-portfolio-embed
         data-mode="gallery"
         data-theme="light"
         data-base-url="path/to/portfolio-demo/">
    </div>

    <!-- Portfolio Demo JavaScript -->
    <script src="path/to/portfolio-demo/assets/js/embed.js"></script>
</body>
</html>
```

### 2. Manual Initialization

For more control over the initialization:

```html
<div id="my-portfolio"></div>

<script src="path/to/portfolio-demo/assets/js/embed.js"></script>
<script>
    const portfolio = new PortfolioEmbed({
        container: '#my-portfolio',
        mode: 'gallery',
        theme: 'light',
        baseUrl: 'path/to/portfolio-demo/',
        limit: 4,
        projects: ['acai-dany', 'barbearia-raimundos', 'financas-pessoais']
    });
</script>
```

## Integration Modes

### Gallery Mode (Default)
Full-featured gallery with project cards in a responsive grid.

```html
<div data-portfolio-embed data-mode="gallery"></div>
```

### Carousel Mode
Horizontal scrolling carousel with navigation controls.

```html
<div data-portfolio-embed data-mode="carousel"></div>
```

### Grid Mode
Compact grid layout without header section.

```html
<div data-portfolio-embed data-mode="grid"></div>
```

### List Mode
Vertical list layout for sidebar integration.

```html
<div data-portfolio-embed data-mode="list"></div>
```

## Configuration Options

### Data Attributes (Auto-initialization)

| Attribute | Description | Default | Example |
|-----------|-------------|---------|---------|
| `data-portfolio-embed` | Enables auto-initialization | - | Required |
| `data-mode` | Display mode | `gallery` | `gallery`, `carousel`, `grid`, `list` |
| `data-theme` | Color theme | `light` | `light`, `dark`, `auto` |
| `data-limit` | Number of projects to show | `0` (all) | `4` |
| `data-projects` | Specific projects to include | All | `acai-dany,barbearia-raimundos` |
| `data-base-url` | Base URL for assets | `''` | `/portfolio-demo/` |
| `data-open-mode` | How demos open | `modal` | `modal`, `newTab`, `iframe` |

### JavaScript Options (Manual initialization)

```javascript
const options = {
    // Container
    container: '#portfolio-embed',           // Element or selector
    
    // Display
    mode: 'gallery',                        // gallery, carousel, grid, list
    theme: 'light',                         // light, dark, auto
    limit: 0,                               // Number of projects (0 = all)
    projects: [],                           // Specific projects to show
    
    // Integration
    baseUrl: '',                            // Base URL for assets
    openMode: 'modal',                      // modal, newTab, iframe
    
    // Performance
    lazyLoad: true,                         // Enable lazy loading
    preloadImages: true,                    // Preload project images
    deferNonCritical: true,                 // Defer non-critical operations
    
    // Callbacks
    onProjectClick: (key, project, event) => {
        // Custom project click handler
        console.log('Project clicked:', key);
        // Return false to prevent default action
    },
    onLoad: (embed, metrics) => {
        // Called when embed loads successfully
        console.log('Embed loaded in', metrics.loadTime, 'ms');
    },
    onError: (error) => {
        // Called when embed fails to load
        console.error('Embed error:', error);
    }
};

const portfolio = new PortfolioEmbed(options);
```

## Performance Optimization

### 1. Lazy Loading

Enable lazy loading for better performance:

```javascript
const portfolio = new PortfolioEmbed({
    container: '#portfolio',
    lazyLoad: true,              // Enable lazy loading
    preloadImages: false,        // Disable preloading for faster initial load
    deferNonCritical: true       // Defer non-critical operations
});
```

### 2. Resource Hints

Add resource hints to your page head for better performance:

```html
<head>
    <!-- DNS prefetch for faster resource loading -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    
    <!-- Preconnect to critical domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    
    <!-- Preload critical CSS -->
    <link rel="preload" href="path/to/portfolio-demo/assets/css/embed.css" as="style">
</head>
```

### 3. Performance Monitoring

Include the performance monitor for optimization insights:

```html
<script src="path/to/portfolio-demo/assets/js/performance.js"></script>
<script>
    // Performance monitoring is automatically enabled
    // Check console for performance insights
</script>
```

## Styling and Customization

### CSS Custom Properties

Override default styles using CSS custom properties:

```css
.portfolio-embed[data-theme="light"] {
    --embed-primary: #your-brand-color;
    --embed-primary-hover: #your-brand-hover-color;
    --embed-bg: #your-background-color;
    --embed-text: #your-text-color;
}
```

### Custom CSS Classes

Add custom styles to specific elements:

```css
/* Custom card styling */
.portfolio-embed__card {
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Custom button styling */
.portfolio-embed__button {
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    border-radius: 25px;
}

/* Custom header styling */
.portfolio-embed__title {
    font-family: 'Your Custom Font', sans-serif;
    color: #your-brand-color;
}
```

### Responsive Breakpoints

Customize responsive behavior:

```css
@media (max-width: 768px) {
    .portfolio-embed__grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

@media (max-width: 480px) {
    .portfolio-embed__title {
        font-size: 1.25rem;
    }
}
```

## Integration Examples

### 1. WordPress Integration

```php
// In your theme's functions.php
function enqueue_portfolio_assets() {
    wp_enqueue_style('portfolio-embed', get_template_directory_uri() . '/assets/css/embed.css');
    wp_enqueue_script('portfolio-embed', get_template_directory_uri() . '/assets/js/embed.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_portfolio_assets');
```

```html
<!-- In your template -->
<div id="portfolio-section" 
     data-portfolio-embed
     data-mode="gallery"
     data-theme="light"
     data-limit="6"
     data-base-url="<?php echo get_template_directory_uri(); ?>/portfolio-demo/">
</div>
```

### 2. React Integration

```jsx
import { useEffect, useRef } from 'react';

const PortfolioSection = ({ mode = 'gallery', theme = 'light', limit = 0 }) => {
    const containerRef = useRef(null);
    const portfolioRef = useRef(null);

    useEffect(() => {
        // Load the embed script dynamically
        const script = document.createElement('script');
        script.src = '/portfolio-demo/assets/js/embed.js';
        script.onload = () => {
            if (window.PortfolioEmbed && containerRef.current) {
                portfolioRef.current = new window.PortfolioEmbed({
                    container: containerRef.current,
                    mode,
                    theme,
                    limit,
                    baseUrl: '/portfolio-demo/',
                    onProjectClick: (key, project) => {
                        // Custom handling
                        console.log('Project clicked:', key);
                    }
                });
            }
        };
        document.head.appendChild(script);

        return () => {
            if (portfolioRef.current && portfolioRef.current.destroy) {
                portfolioRef.current.destroy();
            }
        };
    }, [mode, theme, limit]);

    return <div ref={containerRef} className="portfolio-container" />;
};

export default PortfolioSection;
```

### 3. Vue.js Integration

```vue
<template>
    <div ref="portfolioContainer" class="portfolio-section"></div>
</template>

<script>
export default {
    name: 'PortfolioSection',
    props: {
        mode: { type: String, default: 'gallery' },
        theme: { type: String, default: 'light' },
        limit: { type: Number, default: 0 }
    },
    data() {
        return {
            portfolio: null
        };
    },
    async mounted() {
        // Load embed script
        await this.loadScript('/portfolio-demo/assets/js/embed.js');
        
        // Initialize portfolio
        if (window.PortfolioEmbed) {
            this.portfolio = new window.PortfolioEmbed({
                container: this.$refs.portfolioContainer,
                mode: this.mode,
                theme: this.theme,
                limit: this.limit,
                baseUrl: '/portfolio-demo/'
            });
        }
    },
    beforeUnmount() {
        if (this.portfolio && this.portfolio.destroy) {
            this.portfolio.destroy();
        }
    },
    methods: {
        loadScript(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
    }
};
</script>
```

### 4. Static HTML Integration

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Site - Projetos</title>
    
    <!-- Performance optimizations -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    
    <!-- Portfolio styles -->
    <link rel="stylesheet" href="portfolio-demo/assets/css/embed.css">
    
    <!-- Your site styles -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Meu Site</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">Sobre</a>
            <a href="#projects">Projetos</a>
            <a href="#contact">Contato</a>
        </nav>
    </header>

    <main>
        <section id="home">
            <h2>Bem-vindo</h2>
            <p>Conheça meus projetos abaixo.</p>
        </section>

        <section id="projects">
            <!-- Portfolio embed -->
            <div data-portfolio-embed
                 data-mode="gallery"
                 data-theme="light"
                 data-limit="4"
                 data-base-url="portfolio-demo/">
            </div>
        </section>
    </main>

    <!-- Portfolio script -->
    <script src="portfolio-demo/assets/js/embed.js"></script>
    
    <!-- Performance monitoring (optional) -->
    <script src="portfolio-demo/assets/js/performance.js"></script>
</body>
</html>
```

## Advanced Configuration

### Custom Project Configuration

Create a custom project configuration file:

```javascript
// custom-projects.js
window.customProjectConfig = {
    "my-project-1": {
        name: "Meu Projeto 1",
        description: "Descrição do projeto",
        preview: "assets/images/my-project-1.jpg",
        technologies: ["HTML", "CSS", "JavaScript"],
        demoPath: "./demos/my-project-1/"
    },
    "my-project-2": {
        name: "Meu Projeto 2",
        description: "Descrição do projeto",
        preview: "assets/images/my-project-2.jpg",
        technologies: ["React", "Node.js"],
        demoPath: "./demos/my-project-2/"
    }
};
```

```javascript
// Use custom configuration
const portfolio = new PortfolioEmbed({
    container: '#portfolio',
    projects: Object.keys(window.customProjectConfig),
    onLoad: (embed) => {
        // Override project configuration
        embed.projects = window.customProjectConfig;
        embed.render();
    }
});
```

### Custom Event Handling

```javascript
const portfolio = new PortfolioEmbed({
    container: '#portfolio',
    onProjectClick: (projectKey, project, event) => {
        // Custom analytics
        if (window.gtag) {
            window.gtag('event', 'project_view', {
                project_name: project.name,
                project_key: projectKey
            });
        }
        
        // Custom modal or navigation
        if (projectKey === 'special-project') {
            event.preventDefault();
            showCustomModal(project);
            return false; // Prevent default action
        }
        
        // Allow default action for other projects
        return true;
    },
    onLoad: (embed, metrics) => {
        // Performance tracking
        console.log('Portfolio loaded in', metrics.loadTime, 'ms');
        
        // Custom initialization
        initializeCustomFeatures();
    },
    onError: (error) => {
        // Error tracking
        if (window.gtag) {
            window.gtag('event', 'portfolio_error', {
                error_message: error.message
            });
        }
        
        // Fallback content
        showFallbackContent();
    }
});
```

## Performance Best Practices

### 1. Minimize Bundle Size

Only include the features you need:

```html
<!-- Minimal CSS for basic functionality -->
<link rel="stylesheet" href="portfolio-demo/assets/css/embed-minimal.css">

<!-- Full CSS for all features -->
<link rel="stylesheet" href="portfolio-demo/assets/css/embed.css">
```

### 2. Optimize Loading

```javascript
// Defer portfolio loading until user scrolls to section
const portfolioSection = document.getElementById('portfolio-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Load portfolio when section becomes visible
            new PortfolioEmbed({
                container: entry.target,
                mode: 'gallery',
                lazyLoad: true
            });
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(portfolioSection);
```

### 3. Resource Optimization

```html
<head>
    <!-- Critical CSS inline -->
    <style>
        .portfolio-embed { font-family: system-ui, sans-serif; }
        .portfolio-embed__card { background: white; border-radius: 8px; }
    </style>
    
    <!-- Non-critical CSS deferred -->
    <link rel="preload" href="portfolio-demo/assets/css/embed.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="portfolio-demo/assets/css/embed.css"></noscript>
</head>
```

## Troubleshooting

### Common Issues

1. **Portfolio not loading**
   - Check that all file paths are correct
   - Verify that JavaScript is enabled
   - Check browser console for errors

2. **Images not displaying**
   - Verify image paths in project configuration
   - Check that image files exist
   - Ensure proper CORS headers if loading from different domain

3. **Performance issues**
   - Enable lazy loading
   - Reduce the number of projects shown
   - Optimize image sizes
   - Use performance monitoring to identify bottlenecks

4. **Styling conflicts**
   - Use CSS specificity to override conflicting styles
   - Consider using CSS custom properties
   - Check for conflicting CSS frameworks

### Debug Mode

Enable debug mode for troubleshooting:

```javascript
const portfolio = new PortfolioEmbed({
    container: '#portfolio',
    debug: true, // Enable debug logging
    onLoad: (embed, metrics) => {
        console.log('Debug info:', {
            embed,
            metrics,
            projects: embed.projects
        });
    }
});
```

## Browser Support

- **Modern browsers**: Full support (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **Legacy browsers**: Graceful degradation with polyfills
- **Mobile browsers**: Full responsive support
- **Accessibility**: WCAG 2.1 AA compliant

## License

This integration guide and the Portfolio Demo System are provided under the MIT License. See LICENSE file for details.

## Support

For integration support or questions:
- Check the troubleshooting section above
- Review the examples in this guide
- Open an issue in the project repository