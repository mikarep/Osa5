import { func } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request("POST", "http://localhost:3003/api/users", {
      name: "TName",
      username: "TUsername",
      password: "TPassword"
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get("#username").type("TUsername")
      cy.get("#password").type("TPassword")
      cy.get("#login-button").click()
      cy.contains("TName logged in")
    })

    it('fails with wrong credentials', function() {
      cy.get("#username").type("TUsername")
      cy.get("#password").type("TestPassword")
      cy.get("#login-button").click()
      cy.contains("wrong username or password")
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get("#username").type("TUsername")
      cy.get("#password").type("TPassword")
      cy.get("#login-button").click()
      cy.contains("TName logged in")
    })

    it('A blog can be created', function() {
      cy.contains("new blog").click()
      cy.get("#title").type("TestTitle")
      cy.get("#author").type("TestAuthor")
      cy.get("#url").type("TestUrl")
      cy.get("#blog-submit").click()

      cy.get(".hiddenBlog")
        .should("contain", "TestTitle TestAuthor")
        .and("contain", "view")
    })
  })

  describe('When logged in and has blogs', function() {
    beforeEach(function() {
      // log in user here
      cy.get("#username").type("TUsername")
      cy.get("#password").type("TPassword")
      cy.get("#login-button").click()
      cy.contains("TName logged in")

      cy.contains("new blog").click()
      cy.get("#title").type("TestTitle")
      cy.get("#author").type("TestAuthor")
      cy.get("#url").type("TestUrl")
      cy.get("#blog-submit").click()

      cy.get("#title").type("TestTitle2")
      cy.get("#author").type("TestAuthor2")
      cy.get("#url").type("TestUrl2")
      cy.get("#blog-submit").click()
    })

    it('A blog can be liked', function() {
      cy.contains("TestTitle TestAuthor").parent().contains("view").click()
      cy.contains("TestTitle TestAuthor").parent().contains("Likes: 0")
      cy.contains("TestTitle TestAuthor").parent().contains("Like").click()
      cy.contains("TestTitle TestAuthor").parent().contains("Likes: 1")
    })

    it('A blog can be deleted', function() {
      cy.contains("TestTitle TestAuthor").parent().contains("Delete").click()
      cy.reload()
      cy.contains("TestTitle TestAuthor").should("not.exist")
    })

    it('Blogs ordered by likes', function() {
      cy.get("#blogs").children().eq(1).contains("TestTitle TestAuthor").contains("view").click()
      cy.get("#blogs").children().eq(1).contains("TestTitle TestAuthor").get("#like-button").click()

      cy.get("#blogs").children().eq(0).contains("TestTitle TestAuthor")
      cy.get("#blogs").children().eq(1).contains("TestTitle2 TestAuthor2")
    })
  })
})