import React, { useState } from 'react'

export const useModalAlert = (initial = false) => {
    [openModal, setOpenModal] = useState(initial)
    const openModalAlert = () => setOpenModal(true)
    // const closeModalAlert=()=>{
    setTimeout(() => { setOpenModal(false) }, 2000)
    // }
    //   return [openModal,openModalAlert,closeModalAlert]
    return [openModal, openModalAlert]
}
