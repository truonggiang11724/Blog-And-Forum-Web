import React, { useEffect, useState } from 'react';
import styles from './sidebar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/categorySlice';
import { fetchPosts } from '../postsSlice';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const { listCategory } = useSelector((state) => state.categories)
    useEffect(() => {
        dispatch(getCategories());
    }, [])
    
    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(fetchPosts({search, 'categories[]':categories}))
    }

    const handleCheckbox = (e) => {
        if (categories.includes(e.target.value)){
            setCategories(categories.filter(c => c !== e.target.value))
        } else {
            setCategories([...categories,e.target.value]);
        }
    }
    
    return (
        <>
            {listCategory.data ?
                <aside className={styles.sidebar}>
                    <form onSubmit={handleFilter}>
                        <h3 >Lọc theo danh mục:</h3>
                        <ul className={styles.sidebarFilterList}>
                            {/* list category */}
                            {listCategory.data && listCategory.data.map(c => (
                                <li key={c.id} className={styles.sidebarFilter}>
                                    <input type="checkbox" name='category' value={c.id}
                                    onChange={e => handleCheckbox(e)} />
                                    {c.name}</li>
                            ))}

                        </ul>
                        <h3 className={styles.sidebarHeading}>Tìm kiếm bài viết</h3>
                        <input value={search} onChange={e => setSearch(e.target.value)}
                        className={styles.inputSearch} type='text' placeholder='Nhập từ khóa tìm kiếm' />
                        <button className={styles.buttonSearch} type='submit'>Lọc & Tìm kiếm</button>

                        <h3 className={styles.sidebarHeading}>Theo dõi chúng tôi trên:</h3>
                        <div style={{display: 'grid'}}>
                            <a href="#">Facebook:</a> 
                            <a href="#">Twitter:</a> 
                            <a href="#">Instagram:</a>
                        </div>
                    </form>
                </aside>
                : <p>loading...</p>
            }
        </>
    );
}

export default Sidebar;
