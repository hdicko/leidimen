    // Context7 Enhanced About Page Functionality
    class Context7AboutPage {
      constructor() {
        this.searchInput = document.getElementById("memberSearch");
        this.searchClear = document.getElementById("searchClear");
        this.filterPills = document.querySelectorAll(".filter-pill");
        this.memberCards = document.querySelectorAll(".team-card-wrapper");
        this.noResults = document.getElementById("noResults");
        this.resultsCount = document.getElementById("resultsCount");

        this.currentFilter = "all";
        this.searchTerm = "";
        this.memberData = this.extractMemberData();

        this.init();
      }

      init() {
        this.setupEventListeners();
        this.animateCounters();
        this.setupIntersectionObserver();
        this.updateFilterCounts();
        this.setupKeyboardNavigation();
      }

      extractMemberData() {
        const data = [];
        this.memberCards.forEach((card) => {
          data.push({
            element: card,
            name: card.dataset.name || "",
            role: card.dataset.role || "",
            categories: card.dataset.categories || "",
          });
        });
        return data;
      }

      setupEventListeners() {
        // Search functionality - Debounced input for performance
        this.searchInput.addEventListener(
          "input",
          debounce(() => {
            this.searchTerm = this.searchInput.value.toLowerCase();
            this.updateSearchClear();
            this.filterMembers();
          }, 300),
        );

        // Clear search button
        this.searchClear.addEventListener("click", () => {
          this.searchInput.value = "";
          this.searchTerm = "";
          this.updateSearchClear();
          this.filterMembers();
          this.searchInput.focus();
        });

        // Filter pills click handlers
        this.filterPills.forEach((pill) => {
          pill.addEventListener("click", () => {
            this.setActiveFilter(pill);
            this.currentFilter = pill.dataset.filter;
            this.filterMembers();
          });
        });

        // Global function: Smooth scroll for hero button
        window.scrollToSection = (sectionId) => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        };

        // Global function: Open contact modal for specific member
        window.openContactModal = (memberName) => {
          this.showContactModal(memberName);
        };

        // Global function: Reset all filters and search
        window.clearFilters = () => {
          this.searchInput.value = "";
          this.searchTerm = "";
          this.currentFilter = "all";
          this.updateSearchClear();
          this.setActiveFilter(document.querySelector('[data-filter="all"]'));
          this.filterMembers();
        };
      }

      updateSearchClear() {
        if (this.searchTerm) {
          this.searchClear.classList.remove("d-none");
        } else {
          this.searchClear.classList.add("d-none");
        }
      }

      setActiveFilter(activeButton) {
        this.filterPills.forEach((pill) => pill.classList.remove("active"));
        activeButton.classList.add("active");
      }

      /**
       * filterMembers - Core filtering logic
       * Applies both search term AND filter pill criteria
       *
       * Search logic (OR):
       * - Member name contains search term
       * - Member role contains search term
       * - Member categories contain search term
       *
       * Filter logic (OR):
       * - "all" shows everyone
       * - Otherwise checks role or categories match filter
       *
       * Combined with AND: (matchesSearch && matchesFilter)
       */
      filterMembers() {
        let visibleCount = 0;

        this.memberData.forEach((member) => {
          // Search matching - checks name, role, categories
          const matchesSearch =
            !this.searchTerm ||
            member.name.includes(this.searchTerm) ||
            member.role.includes(this.searchTerm) ||
            member.categories.includes(this.searchTerm);

          // Filter pill matching - checks role or categories
          const matchesFilter =
            this.currentFilter === "all" ||
            member.role.includes(this.currentFilter) ||
            member.categories.includes(this.currentFilter);

          // Show/hide based on both criteria
          if (matchesSearch && matchesFilter) {
            this.showMember(member.element);
            visibleCount++;
          } else {
            this.hideMember(member.element);
          }
        });

        this.updateResultsCount(visibleCount);
        this.toggleNoResults(visibleCount === 0);
      }

      /**
       * showMember - Reveals a member card with fade-in
       */
      showMember(element) {
        element.classList.remove("hide", "filtering");
        element.style.display = "";
      }

      /**
       * hideMember - Hides a member card with fade-out animation
       * Uses delayed style.display for smooth transition
       */
      hideMember(element) {
        element.classList.add("filtering");
        setTimeout(() => {
          if (element.classList.contains("filtering")) {
            element.classList.add("hide");
            element.style.display = "none";
          }
        }, 300);
      }

      /**
       * updateResultsCount - Updates and animates the results counter
       * Adds scale bounce effect to draw attention
       */
      updateResultsCount(count) {
        this.resultsCount.textContent = count;

        // Animate counter - scale bounce effect
        const counter = this.resultsCount;
        counter.style.transform = "scale(1.2)";
        counter.style.color = "var(--context7-primary)";

        setTimeout(() => {
          counter.style.transform = "scale(1)";
          counter.style.color = "";
        }, 300);
      }

      /**
       * toggleNoResults - Shows/hides "no results" message
       */
      toggleNoResults(show) {
        if (show) {
          this.noResults.classList.remove("d-none");
        } else {
          this.noResults.classList.add("d-none");
        }
      }

      updateFilterCounts() {
        this.filterPills.forEach((pill) => {
          const filter = pill.dataset.filter;
          const countElement = pill.querySelector(".pill-count");

          if (filter === "all") {
            countElement.textContent = this.memberData.length;
          } else {
            const count = this.memberData.filter(
              (member) =>
                member.role.includes(filter) ||
                member.categories.includes(filter),
            ).length;
            countElement.textContent = count;
          }
        });
      }

      animateCounters() {
        const statNumbers = document.querySelectorAll(
          ".stat-number[data-count]",
        );

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        });

        statNumbers.forEach((number) => observer.observe(number));
      }

      animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            element.textContent = target + (target === 100 ? "" : "+");
            clearInterval(timer);
          } else {
            element.textContent =
              Math.floor(current) + (target === 100 ? "" : "+");
          }
        }, 16);
      }

      setupIntersectionObserver() {
        const cards = document.querySelectorAll(".team-card-wrapper");

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.style.animationDelay = `${index * 100}ms`;
                  entry.target.classList.add("animate-in");
                }, index * 100);
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "50px",
          },
        );

        cards.forEach((card) => observer.observe(card));
      }

      setupKeyboardNavigation() {
        this.searchInput.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            this.searchInput.blur();
          } else if (e.key === "Enter") {
            const firstVisible = document.querySelector(
              ".team-card-wrapper:not(.hide) .btn-primary-action",
            );
            if (firstVisible) {
              firstVisible.click();
            }
          }
        });

        // Arrow key navigation for filter pills
        this.filterPills.forEach((pill, index) => {
          pill.addEventListener("keydown", (e) => {
            let targetIndex;

            if (e.key === "ArrowLeft") {
              targetIndex = index > 0 ? index - 1 : this.filterPills.length - 1;
            } else if (e.key === "ArrowRight") {
              targetIndex = index < this.filterPills.length - 1 ? index + 1 : 0;
            }

            if (targetIndex !== undefined) {
              e.preventDefault();
              this.filterPills[targetIndex].focus();
            }
          });
        });
      }

      showContactModal(memberName) {
        // Remove existing modal if any
        const existingModal = document.querySelector("#contactModal");
        if (existingModal) {
          existingModal.remove();
        }

        // Create modal backdrop and container
        const modal = document.createElement("div");
        modal.id = "contactModal";
        modal.className = "contact-modal-backdrop";
        modal.innerHTML = `
      <div class="contact-modal-container">
        <div class="contact-modal-content">
          <!-- Modal Header -->
          <div class="contact-modal-header">
            <h3><i class="bi bi-envelope-heart me-2"></i>Contacter ${memberName}</h3>
            <button class="contact-modal-close" onclick="this.closest('.contact-modal-backdrop').remove()">
              <i class="bi bi-x"></i>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="contact-modal-body">
            <form id="contactForm" class="contact-form">
              <div class="form-group">
                <label for="senderName">Votre nom *</label>
                <input type="text" id="senderName" name="senderName" required>
              </div>

              <div class="form-group">
                <label for="senderEmail">Votre email *</label>
                <input type="email" id="senderEmail" name="senderEmail" required>
              </div>

              <div class="form-group">
                <label for="subject">Sujet *</label>
                <input type="text" id="subject" name="subject" required placeholder="Objet de votre message">
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" rows="6" required placeholder="Votre message pour ${memberName}..."></textarea>
              </div>

              <div class="contact-modal-footer">
                <button type="button" class="btn-secondary" onclick="this.closest('.contact-modal-backdrop').remove()">
                  Annuler
                </button>
                <button type="submit" class="btn-primary">
                  <i class="bi bi-send me-2"></i>Envoyer le message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

        // Add modal styles if not exist
        if (!document.querySelector("#contactModalStyles")) {
          const style = document.createElement("style");
          style.id = "contactModalStyles";
          style.textContent = `
        .contact-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        .contact-modal-container {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: modalSlideIn 0.3s ease;
        }

        .contact-modal-content {
          padding: 0;
        }

        .contact-modal-header {
          padding: 2rem 2rem 1rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .contact-modal-header h3 {
          margin: 0;
          color: var(--context7-dark);
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .contact-modal-close {
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s ease;
        }

        .contact-modal-close:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .contact-modal-body {
          padding: 1rem 2rem 2rem 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 500;
          color: var(--context7-dark);
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--context7-primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .contact-modal-footer {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .btn-primary,
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
        }

        .btn-primary {
          background: var(--context7-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--context7-primary-dark, #2563eb);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #6b7280;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
          color: #374151;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .contact-modal-container {
            margin: 1rem;
            max-width: calc(100% - 2rem);
          }

          .contact-modal-header,
          .contact-modal-body {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          .contact-modal-footer {
            flex-direction: column;
          }
        }
      `;
          document.head.appendChild(style);
        }

        // Add modal to page
        document.body.appendChild(modal);

        // Handle form submission
        const form = modal.querySelector("#contactForm");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleContactFormSubmit(memberName, form);
        });

        // Close modal on backdrop click
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });

        // Focus first input
        setTimeout(() => {
          modal.querySelector("#senderName").focus();
        }, 100);
      }

      handleContactFormSubmit(memberName, form) {
        const formData = new FormData(form);
        const data = {
          to: memberName,
          from: formData.get("senderName"),
          email: formData.get("senderEmail"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        };

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="bi bi-hourglass-split me-2"></i>Envoi en cours...';
        submitBtn.disabled = true;

        // Create mailto link as fallback
        const mailto = `mailto:${document.body.dataset.contactEmail || ""}?subject=${encodeURIComponent(`[Contact ${memberName}] ${data.subject}`)}&body=${encodeURIComponent(`De: ${data.from} (${data.email})\nPour: ${memberName}\n\nMessage:\n${data.message}`)}`;
        // Simulate sending (replace with actual email service integration)
        setTimeout(() => {
          // For now, open default email client
          window.location.href = mailto;

          // Show success notification
          this.showSuccessNotification(memberName);

          // Close modal
          document.querySelector("#contactModal").remove();
        }, 1500);
      }

      showSuccessNotification(memberName) {
        const notification = document.createElement("div");
        notification.className = "success-notification";
        notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <div class="notification-text">
          <h6>Message envoyé !</h6>
          <p>Votre message pour ${memberName} a été transmis.</p>
        </div>
      </div>
    `;

        // Add success notification styles if not exist
        if (!document.querySelector("#successNotificationStyles")) {
          const style = document.createElement("style");
          style.id = "successNotificationStyles";
          style.textContent = `
        .success-notification {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 10001;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          padding: 1rem 1.5rem;
          max-width: 350px;
          animation: slideInRight 0.3s ease;
          border-left: 4px solid #10b981;
        }

        .success-notification .notification-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .success-notification .notification-icon {
          background: #10b981;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .success-notification h6 {
          margin: 0 0 0.25rem 0;
          font-weight: 600;
          color: #065f46;
        }

        .success-notification p {
          margin: 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
          document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 4000);
      }
    }

    // Utility functions
    function debounce(func, wait) {
      let timeout;
      return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
          clearTimeout(timeout);
          func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Initialize when DOM is loaded
    document.addEventListener("DOMContentLoaded", () => {
      new Context7AboutPage();

      // Add loading animation completion
      setTimeout(() => {
        document.body.classList.add("loaded");
      }, 100);
    });

    // Add scroll-to-top functionality
    window.addEventListener(
      "scroll",
      debounce(() => {
        const scrollTop = window.pageYOffset;
        const heroSection = document.querySelector(".context7-hero");

        if (heroSection) {
          const heroHeight = heroSection.offsetHeight;
          const opacity = Math.max(0, 1 - scrollTop / heroHeight);
          heroSection.style.opacity = opacity;
        }
      }, 10),
    );
  </script>

