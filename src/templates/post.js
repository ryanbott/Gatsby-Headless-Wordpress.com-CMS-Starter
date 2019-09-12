import React, { Component } from "react"
// import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import styled from 'styled-components'


const RelatedPost = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: #333;

  img {
    flex: 1;
    margin: 0;
  }

  .related-post--text-container {
    flex: 2;
    padding: 1rem 2rem;
  }
`;

class PostTemplate extends Component {
    render() {
        const post = this.props.data.wordpressPost
        const fluid = (post.featured_media) ? post.featured_media.localFile.childImageSharp.fluid : null

        return (
            <Layout>
              {post.jetpack_featured_media_url &&
                <img src={post.jetpack_featured_media_url} alt={post.title}/>
              }
                <h1 dangerouslySetInnerHTML={{ __html: post.title }} />

                {fluid &&
                  <div>
                    <Img fluid={fluid}/>
                  </div>
                }

                <div dangerouslySetInnerHTML={{ __html: post.content }}  style={{marginBottom: `5rem`,}}/>

                <Link to={`categories/${post.categories[0].slug}`} style={{marginBottom: `3rem`}}>
                Read more posts in '{post.categories[0].name}'
                </Link>
                <hr/>
            </Layout>

        )
    }
}


export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($slug: String!) {
    wordpressPost(slug: { eq: $slug }) {
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      jetpack_featured_media_url
      categories {
        name
        slug
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
