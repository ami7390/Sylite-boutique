'use client'

import React, { useState } from 'react'
import { supabase } from '../lib/supabaseclient'

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner une image.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      // On crée un nom de fichier unique basé sur le timestamp
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `fashion-images/${fileName}`

      // Envoi du fichier vers le bucket 'images' de Supabase
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Récupération de l'URL publique de l'image
      const { data } = supabase.storage.from('images').getPublicUrl(filePath)
      setImageUrl(data.publicUrl)
      alert('Image téléversée avec succès !')

    } catch (error: any) {
      alert(error.message || "Une erreur est survenue lors de l'envoi.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg">
      <label className="cursor-pointer bg-black text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition">
        {uploading ? 'Téléversement en cours...' : 'Sélectionner une image'}
        <input
          type="file"
          accept="image/*"
          onChange={uploadFile}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {imageUrl && (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-sm text-green-600 mb-2">Aperçu de l'image insérée :</p>
          <img src={imageUrl} alt="Uploaded preview" className="w-48 h-48 object-cover rounded shadow" />
        </div>
      )}
    </div>
  )
}