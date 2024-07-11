import { useContext, useEffect, useState } from 'react';
import styles from '/public/CreateCard.module.css'
import {apiRequest} from '/src/utils/apiRequest'
import {AuthContext} from '/src/contexts/authContext'
import {useNavigate} from 'react-router-dom'



export function CreateCardMain(){
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()
   
    if(!user){
        
        navigate('/signup')
    }

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesErr, setSelectedFilesErr] = useState(null);
    const [petPolicy, setPetPolicy] = useState('reject')
    const [propertyPolicy, setPropertyPolicy] = useState('rent')
    const [successAlert, setSuccessAlert] = useState(false)

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 5) {
            setSelectedFilesErr(true)
            setSelectedFiles([])
        } else {
            setSelectedFiles(files);
        }
    };

   const handleSubmitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('petPolicy', petPolicy)
        formData.append('propertyPolicy', propertyPolicy)
  
        try {
            const res = await apiRequest.post('/create-sell-house-offer', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
         
            if(res.data.ok){
                setSuccessAlert(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <> 
            {user 
                ? (
                    <div className={styles.createCardContainer}>
                        {successAlert
                            ?   <div className={styles.successAlert}>
                                    <p className={styles.textSuccessAlert}>{successAlert}</p>
                                </div>
                            : null
                        }
                        <div className={styles.mainCreateCard}>
                            <form id="propertyForm" method='post' action='/create-sell-house-offer' onSubmit={handleSubmitForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" id="title" name="title" required/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" id="price" name="price"required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="address">Address:</label>
                                    <input type="text" id="address" name="address" required/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="description">Description:</label>
                                    <textarea id="description" name="description" required></textarea>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="city">City:</label>
                                    <input type="text" id="city" name="city" required/>
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="total_size">Total Size:</label>
                                    <input type="number" id="total_size" name="totalSize" required/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="bedroom">Bedroom quantity:</label>
                                    <input type="number" id="bedroom" name="bedroom" required/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="bathroom">Bathroom quantity:</label>
                                    <input type="number" id="bathroom" name="bathroom" required/>
                                </div>

                                <div className={styles.policyForm}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.policyLabel}>Pet Policy:</label>
                                        <div className={styles.policyInputContainer}>
                                            <input type="radio" id="pet_policy_yes"  onChange={(e) => setPetPolicy('allow')} name="petPolicy" value={petPolicy} required/>
                                            <label className={styles.policyInnerLabel} htmlFor="pet_policy_yes">ALlow</label>
                                        </div>
                                        <div className={styles.policyInputContainer}>
                                            <input type="radio" id="pet_policy_no" defaultChecked onChange={(e) => setPetPolicy('reject')} name="petPolicy" value={petPolicy} required/>
                                            <label className={styles.policyInnerLabel} htmlFor="pet_policy_no">Reject</label>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.policyLabel}>Property:</label>
                                        <div className={styles.policyInputContainer}>
                                            <input type="radio" id="property_policy_yes"  onChange={(e) => setPropertyPolicy('buy')} value={propertyPolicy} name="propertyPolicy"required/>
                                            <label className={styles.policyInnerLabel} htmlFor="property_policy_yes">Buy</label>
                                        </div>
                                        <div className={styles.policyInputContainer}>
                                            <input type="radio" id="pet_policy_no" defaultChecked onChange={(e) => setPropertyPolicy('rent')} value={propertyPolicy} name="propertyPolicy"required/>
                                            <label className={styles.policyInnerLabel} htmlFor="pet_policy_no">Rent</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.imageUpload}>
                                    <label htmlFor="chooseImage" className={styles.chooseImageLabel}>Maximum: 5 {selectedFilesErr ? <h1>ONLY 5 FILES</h1> : ""}</label>
                                    <input type="file" id='chooseImage' name='images' onChange={handleFileChange} multiple  accept="image/*"/>
                                    <ul>
                                        {selectedFiles.slice(0, 5).map((file, index) => (
                                            <li key={index} className={styles.fileNameImage}>{file.name}</li>
                                        ))}
                                    </ul>
                                
                                    <span className={styles.haveLink}>If you have a links, space-separate</span>
                                    <input type="text" name='linkImage'/>
                                </div>

                                <div className={styles.formGroupBtn}>
                                    <button type="submit">Create offer</button>
                                </div>
                            </form>
                        </div>

                    </div>
                )
                : ''
            }
        </>
    )
}