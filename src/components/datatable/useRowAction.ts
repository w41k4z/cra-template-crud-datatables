import React, { useState } from "react";

const useRowAction = () => {
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);

  const showUpdateModal = () => setUpdateModalVisibility(true);
  const hideUpdateModal = () => setUpdateModalVisibility(false);
  const showDeleteModal = () => setDeleteModalVisibility(true);
  const hideDeleteModal = () => setDeleteModalVisibility(false);

  return {
    updateModalVisibility,
    deleteModalVisibility,
    showUpdateModal,
    hideUpdateModal,
    showDeleteModal,
    hideDeleteModal,
  };
};

export default useRowAction;
