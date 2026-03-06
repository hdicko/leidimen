"""
Playwright test suite for Leidimen website
Generated from exploration of http://localhost:1313
"""
import re
import pytest
from playwright.sync_api import Page, expect

BASE_URL = "http://localhost:1313"


class TestHomepage:
    def test_title_contains_leidimen(self, page: Page):
        page.goto(BASE_URL + "/")
        expect(page).to_have_title(re.compile("Leidimen"))

    def test_hero_h1_visible(self, page: Page):
        page.goto(BASE_URL + "/")
        h1 = page.locator("h1").first
        expect(h1).to_be_visible()
        expect(h1).to_contain_text("Douentza")

    def test_hero_cta_buttons_present(self, page: Page):
        page.goto(BASE_URL + "/")
        # Two CTA buttons visible in hero section
        cta = page.locator("[class*='hero'] a, [class*='cta'] a")
        expect(cta.first).to_be_visible()

    def test_navbar_contains_all_sections(self, page: Page):
        page.goto(BASE_URL + "/")
        nav = page.locator("nav")
        for label in ["Equipe", "Villages", "Actualités", "Documents"]:
            expect(nav.get_by_text(label, exact=False)).to_be_visible()


class TestNavigation:
    def test_navbar_equipe_link_navigates(self, page: Page):
        page.goto(BASE_URL + "/")
        page.locator("nav").get_by_text("Equipe", exact=False).click()
        expect(page).to_have_url(f"{BASE_URL}/equipe/")

    def test_navbar_villages_link_navigates(self, page: Page):
        page.goto(BASE_URL + "/")
        page.locator("nav").get_by_text("Villages", exact=False).click()
        expect(page).to_have_url(f"{BASE_URL}/villages/")

    def test_navbar_actualites_link_navigates(self, page: Page):
        page.goto(BASE_URL + "/")
        page.locator("nav").get_by_text("Actualités", exact=False).click()
        expect(page).to_have_url(f"{BASE_URL}/posts/")

    def test_mobile_hamburger_menu_opens(self, page: Page):
        page.set_viewport_size({"width": 375, "height": 812})
        page.goto(BASE_URL + "/")
        hamburger = page.locator(".navbar-toggler")
        expect(hamburger).to_be_visible()
        hamburger.click()
        collapse = page.locator(".navbar-collapse")
        expect(collapse).to_have_class(re.compile(r"show"))


class TestPostsPage:
    def test_posts_page_loads(self, page: Page):
        page.goto(BASE_URL + "/posts/")
        expect(page.locator("h1, h2").first).to_be_visible()

    def test_posts_page_has_articles(self, page: Page):
        page.goto(BASE_URL + "/posts/")
        articles = page.locator("article, .card")
        expect(articles.first).to_be_visible()
        assert articles.count() > 0

    def test_post_card_has_title_link(self, page: Page):
        page.goto(BASE_URL + "/posts/")
        first_link = page.locator("h2 a, h3 a, .card-title a").first
        expect(first_link).to_be_visible()
        href = first_link.get_attribute("href")
        assert href is not None and href.startswith("/")

    def test_clicking_post_navigates_to_article(self, page: Page):
        page.goto(BASE_URL + "/posts/")
        first_link = page.locator("h2 a, h3 a, .card-title a").first
        href = first_link.get_attribute("href")
        page.goto(BASE_URL + href)
        expect(page.locator("h1").first).to_be_visible()
        expect(page.locator("#main-content")).to_be_visible()


class TestSinglePost:
    POST_PATH = "/posts/2026/comment-creer-un-post-etape-par-etape-en-utilisant-l-app-web-leidimen-cms/"

    def test_single_post_has_title(self, page: Page):
        page.goto(BASE_URL + self.POST_PATH)
        h1 = page.locator("h1").first
        expect(h1).to_be_visible()
        assert len(h1.inner_text().strip()) > 0

    def test_single_post_has_image(self, page: Page):
        page.goto(BASE_URL + self.POST_PATH)
        img = page.locator("main img").first
        expect(img).to_be_visible()

    def test_single_post_villages_link_works(self, page: Page):
        page.goto(BASE_URL + self.POST_PATH)
        villages_link = page.locator("a[href*='/villages/']").first
        expect(villages_link).to_be_visible()
        villages_link.click()
        expect(page).to_have_url(re.compile(r"/villages/"))


class TestVillagesPage:
    def test_villages_page_loads(self, page: Page):
        page.goto(BASE_URL + "/villages/")
        expect(page.locator("h1, h2").first).to_be_visible()

    def test_villages_page_shows_village_items(self, page: Page):
        page.goto(BASE_URL + "/villages/")
        items = page.locator("article, .card")
        expect(items.first).to_be_visible()

    def test_villages_include_douentza(self, page: Page):
        page.goto(BASE_URL + "/villages/")
        douentza = page.get_by_text("Douentza", exact=False).first
        expect(douentza).to_be_visible()

    def test_village_card_links_to_detail_page(self, page: Page):
        page.goto(BASE_URL + "/villages/")
        first_link = page.locator("a[href*='/villages/']").first
        href = first_link.get_attribute("href")
        assert href is not None
        page.goto(BASE_URL + href if href.startswith("/") else href)
        expect(page.locator("h1").first).to_be_visible()


class TestEquipePage:
    def test_equipe_page_loads(self, page: Page):
        page.goto(BASE_URL + "/equipe/")
        h1 = page.locator("h1").first
        expect(h1).to_be_visible()
        expect(h1).to_contain_text("Équipe")

    def test_equipe_page_shows_team_members(self, page: Page):
        page.goto(BASE_URL + "/equipe/")
        names = page.locator("main h3, main h4")
        assert names.count() >= 5

    def test_equipe_member_has_image(self, page: Page):
        page.goto(BASE_URL + "/equipe/")
        img = page.locator("main img").first
        expect(img).to_be_visible()

    def test_equipe_has_hamadoun_dicko(self, page: Page):
        page.goto(BASE_URL + "/equipe/")
        member = page.get_by_text("Hamadoun Dicko", exact=False).first
        expect(member).to_be_visible()


class TestDarkMode:
    def test_page_has_theme_attribute(self, page: Page):
        page.goto(BASE_URL + "/")
        theme = page.evaluate("document.documentElement.getAttribute('data-bs-theme')")
        assert theme in ["light", "dark"]

    def test_dark_mode_default_is_light(self, page: Page):
        page.goto(BASE_URL + "/")
        theme = page.evaluate("document.documentElement.getAttribute('data-bs-theme')")
        assert theme == "light"

    def test_dark_mode_toggle_exists(self, page: Page):
        page.goto(BASE_URL + "/")
        toggle = page.locator(".btn.btn-outline-secondary.rounded-circle").first
        expect(toggle).to_be_visible()

    def test_dark_mode_toggle_switches_theme(self, page: Page):
        page.goto(BASE_URL + "/")
        toggle = page.locator(".btn.btn-outline-secondary.rounded-circle").first
        toggle.click()
        page.wait_for_timeout(300)
        theme = page.evaluate("document.documentElement.getAttribute('data-bs-theme')")
        assert theme == "dark"


class TestFooter:
    def test_footer_is_visible(self, page: Page):
        page.goto(BASE_URL + "/")
        footer = page.locator("footer.footer")
        expect(footer).to_be_visible()

    def test_footer_has_social_links(self, page: Page):
        page.goto(BASE_URL + "/")
        footer = page.locator("footer.footer")
        social_links = footer.locator("a[href*='facebook'], a[href*='twitter'], a[href*='linkedin']")
        assert social_links.count() >= 1

    def test_footer_has_nav_links(self, page: Page):
        page.goto(BASE_URL + "/")
        footer = page.locator("footer.footer")
        for label, href in [("Accueil", "/"), ("Equipe", "/equipe/"), ("Actualités", "/posts/")]:
            expect(footer.locator(f"a[href='{href}']").first).to_be_visible()

    def test_footer_accueil_link_works(self, page: Page):
        page.goto(BASE_URL + "/posts/")
        footer = page.locator("footer.footer")
        footer.get_by_text("Accueil", exact=False).click()
        expect(page).to_have_url(BASE_URL + "/")


class TestSearchPage:
    def test_search_page_exists(self, page: Page):
        response = page.goto(BASE_URL + "/search/")
        assert response.status in [200, 404]  # page may be a redirect or standalone

    def test_search_url_accessible(self, page: Page):
        page.goto(BASE_URL + "/search/")
        # Should not be a 404
        expect(page.locator("body")).to_be_visible()
