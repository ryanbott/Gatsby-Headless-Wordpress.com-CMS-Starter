import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

class PageTemplate extends Component {
  render() {

    const page = this.props.data.wordpressPage

    return (
      <Layout>
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query currentPageQuery($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
    }
    site {
      id
      siteMetadata {
        title
      }
    }
  }
`
