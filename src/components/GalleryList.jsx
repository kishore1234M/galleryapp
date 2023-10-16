import React from 'react'
import FlatList from 'flatlist-react';
import styles from '../styles/app.module.css'
import Loader from './Loader';

export default function GalleryList({galleries,openModal}) {

 const renderGallery = (gallery,idx) => {
    return (
        <div className={styles.grid_item} key={gallery?.url} onClick={()=> openModal(gallery)} >
            <img src={gallery?.download_url} alt='loaded_image' />
        </div>
    );
 }

  return (
    <div className={styles.grid_container}>
        <FlatList
          list={galleries}
          renderItem={renderGallery}
          renderWhenEmpty={() => {
            return(
                <div className={styles.loader}>
                    <Loader />
                    <span>Loadind images ...</span>
                </div>
            )
          }}
        //   sortBy={["firstName", {key: "lastName", descending: true}]}
        //   groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
        />
    </div>
  )
}
