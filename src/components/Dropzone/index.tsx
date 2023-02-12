/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import {useDropzone} from 'react-dropzone'

import {errorMessage} from '../../common/notifications'

import styles from './Dropzone.module.scss'

const acceptedFiletype = {'application/json': ['.json']}

interface Props {
    setValue: (value: string) => void
}

export const Dropzone: React.FC<Props> = ({setValue}) => {
    const {
        getRootProps, isDragActive,
    } = useDropzone({
        accept: acceptedFiletype,
        multiple: false,
        onDropAccepted: async acceptedFiles => {
            acceptedFiles.forEach(file => {
                const reader = new FileReader()

                reader.onabort = () => errorMessage(new Error(), 'file reading was aborted')
                reader.onerror = () => errorMessage(new Error(), 'file reading has failed')
                reader.onload = (e: any) => {
                    setValue(e.target.result)
                }
                reader.readAsText(file)
            })
        },
        onDropRejected: fileArr => {
            const isToManyFiles = fileArr[0].errors.some(item => item.code === 'too-many-files')
            const isInvalidType = fileArr[0].errors.some(item => item.code === 'file-invalid-type')
            if (isToManyFiles) errorMessage(new Error(), 'You cannot upload more than one file at a time')
            if (isInvalidType) errorMessage(new Error(), 'Incorrect file format')
        },
    })
    return (
        <div {...getRootProps({className: styles.dropzone})}>
            {
                isDragActive
                    ? <p>Drop the files here ...</p>
                    : <p>Drag drop some files here, or click to select files</p>
            }
        </div>
    )
}
