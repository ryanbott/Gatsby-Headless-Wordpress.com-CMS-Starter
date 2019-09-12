import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import styled from 'styled-components'
import Image from "../components/image"
import SEO from "../components/seo"

const HomeBlogSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > * {
    width: 48%;
  }
`;

const BlogPost = styled.article`
  position: relative;
  background: #333;
  margin-bottom: 2rem;

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    max-height: 400px;
    margin: 0;
  }

  h3, p {
    color: #eee;
    padding: 1rem 1rem 0;
  }
`;

class IndexPage extends Component {
  render() {
    const data = this.props.data


    return (
      <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link>

        <hr />
        <h2>
          <Link
            to="/blog/"
            style={{
              fontSize: 2 + `rem`,
              color: `var(--font)`,
            }}>
            Recent Posts generated from WP
          </Link>
        </h2>

        <HomeBlogSection>
          {data.allWordpressPost.edges.map(({ node }) => (

            <BlogPost key={node.slug}>
              <Link to={`blog/${node.slug}`}>
                {node.jetpack_featured_media_url &&
                  <img src={node.jetpack_featured_media_url} alt={node.title}/>
                }
                <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </Link>
              <p>{node.date} || <Link to={`categories/${node.categories[0].slug}`}>{node.categories[0].name}</Link></p>
            </BlogPost>
          ))}
        </HomeBlogSection>
      </Layout>
    )
  }

}

export default IndexPage


export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
          jetpack_featured_media_url
          date(formatString: "MMMM DD, YYYY")
          categories {
            name
            slug
          }
        }
      }
    }
  }
`
