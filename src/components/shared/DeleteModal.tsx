import React from "react";
import { Modal, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getArticleData } from "../../store/selectors/ArticleSelector";

interface DeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { deleteLoading } = useSelector(getArticleData);
  return (
    <Modal
      title={t("pages.article.deleteArticle")}
      open={open}
      centered
      footer={[
        <Button key="cancel" type="default" onClick={onCancel}>
          {t("action.no")}
        </Button>,
        <Button
          loading={deleteLoading}
          key="delete"
          danger
          type="primary"
          onClick={onConfirm}
        >
          {t("action.yes")}
        </Button>,
      ]}
      onCancel={onCancel}
    >
      {t("pages.article.deleteConfirm")}
    </Modal>
  );
};

export default DeleteModal;
