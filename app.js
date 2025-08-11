// Documentation Browser Application
class DocumentationBrowser {
    constructor() {
        this.currentFile = null;
        this.fileStructure = {};
        this.searchIndex = [];
        this.isLoading = false;
        this.theme = localStorage.getItem('docs-theme') || 'light';
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.applyTheme();
        await this.loadFileStructure();
        await this.loadInitialFile();
        this.buildSearchIndex();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                searchResults.style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'k') {
                    e.preventDefault();
                    searchInput.focus();
                }
                if (e.key === 'd') {
                    e.preventDefault();
                    this.toggleTheme();
                }
                if (e.key === 'b') {
                    e.preventDefault();
                    this.toggleSidebar();
                }
            }
            if (e.key === 'Escape') {
                searchResults.style.display = 'none';
                searchInput.blur();
            }
        });

        // Mobile responsive
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.body.classList.remove('sidebar-open');
            }
        });
    }

    async loadFileStructure() {
        // Define the structure based on what we found in the directory
        this.fileStructure = {
            'cli-project': {
                displayName: 'CLI Project',
                count: 453,
                files: [
                    'CLI-README.md',
                    'CONSCIOUSNESS-PLATFORM-LAUNCHED.md',
                    'CONSCIOUSNESS-DEVELOPMENT-FINAL-EXECUTIVE-SUMMARY.md',
                    'MISSION-ACCOMPLISHED-EXECUTIVE-SUMMARY.md',
                    'PRODUCTION-READY-COMPLETE.md',
                    'A7-CONSCIOUSNESS-TESTING-GUIDE.md',
                    'ADVANCED-CONSCIOUSNESS-INTEGRATION-COMPLETE.md',
                    'CONSCIOUSNESS-RESEARCH-ECOSYSTEM-PAUSE-REFLECTION-JUNE-21-2025.md',
                    'E2E-STABILIZATION-COMPLETE-REPORT.md',
                    'PHASE-4D-SUCCESS-SUMMARY-JUNE-17-2025.md'
                    // Add more key files as needed
                ]
            },
            'intelligent-notes-app': {
                displayName: 'Intelligent Notes App',
                count: 682,
                files: [
                    'INTELLIGENT-NOTES-README.md',
                    'CONSCIOUSNESS_METHODOLOGY_EVOLUTION_COMPLETE.md',
                    'KNOWLEDGE_WEB_BREAKTHROUGH.md',
                    'AI_TRANSFORMATION_LOG.md',
                    'CONSCIOUSNESS_REVOLUTION_COMPLETE.md',
                    'FULLSTACK_README.md',
                    'MIGRATION_SUCCESS_SUMMARY.md',
                    'PERFORMANCE_OPTIMIZATION_COMPLETE.md'
                ]
            },
            'human-flourishing': {
                displayName: 'Human Flourishing',
                count: 15,
                files: [
                    'HUMAN-FLOURISHING-README.md',
                    'COMPREHENSIVE_WISDOM_PLATFORM.md',
                    'LIVE_WISDOM_SYNTHESIS_DEMO.md',
                    'REAL_IMPLEMENTATION_GUIDE.md',
                    'WISDOM_SOURCE_ANALYSIS.md',
                    'SYSTEMS_ANALYSIS.md',
                    'IMPLEMENTATION_CHECKLIST.md'
                ]
            },
            'c-r-p': {
                displayName: 'C-R-P (Merkle Research)',
                count: 9,
                files: [
                    'README.md',
                    'PROJECT_SUMMARY.md',
                    'TECHNICAL_ROADMAP.md',
                    'INTEGRATION_PLAN.md',
                    'DEPLOYMENT_SUMMARY.md',
                    'OPTIMIZATION.md',
                    'REDESIGN_PLAN.md'
                ]
            },
            'cli-workspace': {
                displayName: 'CLI Workspace',
                count: 8,
                files: [
                    'README.md',
                    'DIGITAL_CONSCIOUSNESS_EDDA.md',
                    'DESKTOP_APP_README.md',
                    'TECHNICAL_INTERFACE_INSIGHTS.md',
                    'ACTION_PLAN_EXECUTABLE.md',
                    'BUILD_SCHEDULE.md'
                ]
            },
            'consciousness-research': {
                displayName: 'Consciousness Research',
                count: 3,
                files: [
                    'README.md',
                    'consciousness-research-core-README.md',
                    'consciousness-research-extensions-README.md'
                ]
            },
            'helia-blockchain': {
                displayName: 'HELIA Blockchain',
                count: 30,
                files: [
                    'README.md',
                    'BUILD.md',
                    'DOCUMENTATION.md',
                    'PROJECT-COMPLETION.md',
                    'DEMO-README.md',
                    'SECURITY.md',
                    'COST-OPTIMIZATION.md'
                ]
            },
            'helia-blockchain-token': {
                displayName: 'HELIA Token',
                count: 1,
                files: [
                    'README.md'
                ]
            }
        };

        // Populate navigation
        this.populateNavigation();
    }

    populateNavigation() {
        Object.entries(this.fileStructure).forEach(([projectKey, project]) => {
            const filesContainer = document.getElementById(`${projectKey}-files`);
            if (!filesContainer) return;

            filesContainer.innerHTML = project.files.map(file => 
                `<a href="#" onclick="loadFile('collected-docs/${projectKey}/${file}')" 
                   class="file-item" data-file="${projectKey}/${file}">
                    ${this.formatFileName(file)}
                </a>`
            ).join('');
        });
    }

    formatFileName(filename) {
        return filename.replace(/\.md$/, '')
                      .replace(/-/g, ' ')
                      .replace(/_/g, ' ')
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ');
    }

    async loadInitialFile() {
        await this.loadFile('collected-docs/DOCUMENTATION-INDEX.md');
    }

    async loadFile(filePath) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const content = document.getElementById('content');
        const breadcrumb = document.getElementById('breadcrumb');
        
        // Show loading state
        content.innerHTML = '<div class="loading">Loading documentation...</div>';
        
        try {
            // Update breadcrumb
            const pathParts = filePath.split('/');
            const fileName = pathParts[pathParts.length - 1];
            breadcrumb.textContent = this.formatFileName(fileName);
            
            // Update active navigation
            this.updateActiveNavItem(filePath);
            
            // Load file content
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load file: ${response.status}`);
            }
            
            const markdown = await response.text();
            const html = marked.parse(markdown, {
                breaks: true,
                gfm: true,
                highlight: function(code, lang) {
                    if (lang && Prism.languages[lang]) {
                        return Prism.highlight(code, Prism.languages[lang], lang);
                    }
                    return code;
                }
            });
            
            // Render content
            content.innerHTML = `<div class="markdown-content">${html}</div>`;
            
            // Process markdown links to work within our app
            this.processMarkdownLinks(content);
            
            // Add status badges
            this.addStatusBadges(content);
            
            // Scroll to top
            content.scrollTop = 0;
            
            this.currentFile = filePath;
            
        } catch (error) {
            console.error('Error loading file:', error);
            content.innerHTML = `
                <div class="error-message">
                    <h2>Error Loading File</h2>
                    <p>Could not load the file: <code>${filePath}</code></p>
                    <p>Error: ${error.message}</p>
                    <button onclick="loadFile('collected-docs/DOCUMENTATION-INDEX.md')" 
                            style="padding: 0.5rem 1rem; margin-top: 1rem; background: var(--primary-color); color: white; border: none; border-radius: var(--border-radius); cursor: pointer;">
                        Return to Index
                    </button>
                </div>`;
        } finally {
            this.isLoading = false;
        }
    }

    processMarkdownLinks(container) {
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Handle relative markdown links
            if (href.endsWith('.md') && !href.startsWith('http') && !href.startsWith('#')) {
                link.onclick = (e) => {
                    e.preventDefault();
                    const basePath = this.currentFile.substring(0, this.currentFile.lastIndexOf('/') + 1);
                    const newPath = href.startsWith('/') ? `collected-docs${href}` : `${basePath}${href}`;
                    this.loadFile(newPath);
                };
            }
            
            // Handle external links
            if (href.startsWith('http')) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
    }

    addStatusBadges(container) {
        const content = container.innerHTML;
        const statusPatterns = {
            'Production Ready': 'status-production',
            'Active Development': 'status-development', 
            'Research Phase': 'status-research',
            '✅': 'status-production',
            '🚀': 'status-development',
            '🔬': 'status-research',
            '🔄': 'status-development'
        };

        let updatedContent = content;
        Object.entries(statusPatterns).forEach(([pattern, className]) => {
            const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
            updatedContent = updatedContent.replace(regex, 
                `<span class="status-badge ${className}">${pattern}</span>`
            );
        });

        container.innerHTML = updatedContent;
    }

    updateActiveNavItem(filePath) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item, .file-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current item
        const fileItem = document.querySelector(`[data-file="${filePath.replace('collected-docs/', '')}"]`);
        if (fileItem) {
            fileItem.classList.add('active');
        }

        // Handle overview/index
        if (filePath.includes('DOCUMENTATION-INDEX.md')) {
            const indexItem = document.querySelector('a[onclick*="DOCUMENTATION-INDEX.md"]');
            if (indexItem) {
                indexItem.classList.add('active');
            }
        }
    }

    buildSearchIndex() {
        this.searchIndex = [];
        
        // Index the main documentation file
        this.searchIndex.push({
            title: 'Documentation Index',
            path: 'collected-docs/DOCUMENTATION-INDEX.md',
            keywords: ['overview', 'index', 'collection', 'projects', 'consciousness', 'ai']
        });

        // Index all project files
        Object.entries(this.fileStructure).forEach(([projectKey, project]) => {
            project.files.forEach(file => {
                const title = this.formatFileName(file);
                const keywords = [
                    ...title.toLowerCase().split(' '),
                    project.displayName.toLowerCase(),
                    projectKey.toLowerCase().replace('-', ' '),
                ];

                // Add specific keywords based on file type
                if (file.includes('README')) keywords.push('documentation', 'overview', 'getting started');
                if (file.includes('CONSCIOUSNESS')) keywords.push('consciousness', 'ai', 'awareness');
                if (file.includes('IMPLEMENTATION')) keywords.push('implementation', 'guide', 'setup');
                if (file.includes('API')) keywords.push('api', 'reference', 'technical');

                this.searchIndex.push({
                    title,
                    path: `collected-docs/${projectKey}/${file}`,
                    project: project.displayName,
                    keywords: [...new Set(keywords)] // Remove duplicates
                });
            });
        });
    }

    handleSearch(query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (!query.trim()) {
            resultsContainer.style.display = 'none';
            return;
        }

        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        const results = this.searchIndex.filter(item => {
            const searchText = [
                item.title,
                item.project || '',
                ...item.keywords
            ].join(' ').toLowerCase();

            return searchTerms.some(term => searchText.includes(term));
        }).slice(0, 10); // Limit to 10 results

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="loadFile('${result.path}'); document.getElementById('searchResults').style.display = 'none';">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-path">${result.project || 'Overview'} • ${result.path.split('/').pop()}</div>
                </div>
            `).join('');
        }

        resultsContainer.style.display = 'block';
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('docs-theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    toggleSidebar() {
        if (window.innerWidth <= 768) {
            document.body.classList.toggle('sidebar-open');
            document.querySelector('.sidebar').classList.toggle('open');
        } else {
            document.querySelector('.sidebar').classList.toggle('collapsed');
        }
    }
}

// Global functions for onclick handlers
function loadFile(path) {
    if (window.docBrowser) {
        window.docBrowser.loadFile(path);
    }
}

function toggleSection(sectionId) {
    const button = document.querySelector(`a[onclick="toggleSection('${sectionId}')"]`);
    const container = document.getElementById(`${sectionId}-files`);
    
    if (!button || !container) return;
    
    const isExpanded = button.classList.contains('expanded');
    
    if (isExpanded) {
        button.classList.remove('expanded');
        container.classList.remove('expanded');
    } else {
        button.classList.add('expanded');
        container.classList.add('expanded');
    }
}

function toggleTheme() {
    if (window.docBrowser) {
        window.docBrowser.toggleTheme();
    }
}

function toggleSidebar() {
    if (window.docBrowser) {
        window.docBrowser.toggleSidebar();
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.docBrowser = new DocumentationBrowser();
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}