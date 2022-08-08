import React, { useState } from 'react'

export const useModalAlert = (initial = false) => {
    const [openModal, setOpenModal] = useState(initial)
    const openModalAlert = () => setOpenModal(true)
    const closeModalAlert = () => {
        // setTimeout(async() => {await setOpenModal(false) }, 2000)
        setOpenModal(false)
    }
    return [openModal, openModalAlert, closeModalAlert]
    // return [openModal, openModalAlert]
}
export const useModalAlertError = (initial = false) => {
    const [openModalError, setOpenModalError] = useState(initial)
    const openModalAlertError = () => setOpenModalError(true)
    const closeModalAlertError = () => {
        // setTimeout(async() => {await setOpenModal(false) }, 2000)
        setOpenModalError(false)
    }
    return [openModalError, openModalAlertError, closeModalAlertError]
    // return [openModal, openModalAlert]
}
