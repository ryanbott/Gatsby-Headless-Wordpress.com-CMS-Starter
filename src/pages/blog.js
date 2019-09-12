import React, { Component } from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
import styled from 'styled-components'

const BlogSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
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


class Blog extends Component {
  render() {
    const data = this.props.data

    return (
      <Layout>
        <hr />
        <h1>Recent Posts</h1>
        <p>Categories:
          <ul style={{ display: `flex`, flexWrap: `wrap`,justifyContent: `space-around`, }}>
          {data.allWordpressCategory.edges.map(({ node }) => (
            <li
              key={node.id}
              style={{
                listStyle: `none`,
                padding: `1rem`,
              }}
            >
              <Link to={`categories/${node.slug}`}>{node.name}</Link>
            </li>
          ))}

          </ul>
        </p>
        <BlogSection>
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
        </BlogSection>

      </Layout>
    )
  }
}

export default Blog

// Set here the ID of the home page.
export const blogQuery = graphql`
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

    allWordpressCategory(filter: {count: {gt: 0}}) {
      edges {
        node {
          slug
          name
          id
        }
      }
    }
  }
`
