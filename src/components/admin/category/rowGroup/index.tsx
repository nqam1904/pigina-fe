"use client";
import styles from "./rowGroup.module.scss";

import Popup from "@/components/UI/popup";
import { useState } from "react";

import { deleteCategory, TGetAllCategories } from "@/actions/category/category";

import { Button } from "antd";
import GroupCategory from "../../forms/groupCategory";
import Category from "./category";
import CategoryOptions from "./categoryOptions";
import ModalCategory from "./modalCategory";

interface IProps {
  data: TGetAllCategories;
  categories: TGetAllCategories[];
  onReset?: () => void;
}

const RowCatGroup = ({ data, categories, onReset }: IProps) => {
  const { id: groupId, name } = data;

  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ---------------------- FUNCTIONS ----------------------

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteCategory(groupId);
    if (response.error) {
      setErrorMsg(response.error);
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setErrorMsg("");
      setIsLoading(false);
      setShowDelete(false);
      onReset?.();
    }
  };

  return (
    <div className={styles.catGroupRow}>
      <div>
        <Button onClick={() => setShowOptions(true)}>Cấu hình chi tiết</Button>
        <Button onClick={() => setShowModal(true)}>Thêm danh mục</Button>
      </div>
      <div>
        <Button
          onClick={() => setShowEdit(true)}
          variant="outlined"
          color="default"
        >
          Sửa
        </Button>
        <Button
          color="danger"
          variant="solid"
          onClick={() => setShowDelete(true)}
        >
          Xóa
        </Button>
      </div>
      {categories.length > 0 && (
        <div className={styles.categories}>
          {categories?.map(
            (cat) =>
              cat.parentID === data.id && (
                <Category
                  data={cat}
                  key={cat.id}
                  subCategories={categories.filter(
                    (c) => c.parentID === cat.id,
                  )}
                  onReset={() => onReset?.()}
                />
              ),
          )}
        </div>
      )}
      {showOptions ? (
        <Popup
          content={<CategoryOptions categoryID={groupId} categoryName={name} />}
          isLoading={false}
          onClose={() => setShowOptions(false)}
          onCancel={() => setShowOptions(false)}
          onSubmit={() => setShowOptions(false)}
          title=""
        />
      ) : null}
      <ModalCategory
        isShow={showModal}
        groupId={groupId}
        data={data}
        onReset={onReset}
        onCancel={() => setShowModal(false)}
      />
      {/* EDIT CATEGORY GROUP */}
      {showEdit && (
        <Popup
          title="Cập nhật"
          content={
            <GroupCategory
              isEdit={showEdit}
              data={data}
              onSuccess={() => {
                onReset?.();
                setShowEdit(false);
              }}
            />
          }
          isLoading={isLoading}
          hideCta
          onCancel={() => setShowEdit(false)}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showDelete && (
        <Popup
          content={
            <div className={styles.deleteText}>
              <span>Bạn có chắc muốn xóa?</span>
              <span>{errorMsg}</span>
            </div>
          }
          isLoading={isLoading}
          width="400px"
          onCancel={() => setShowDelete(false)}
          onClose={() => setShowDelete(false)}
          onSubmit={handleDelete}
          isDelete
        />
      )}
    </div>
  );
};

export default RowCatGroup;
