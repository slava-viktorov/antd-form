import { Button, Row, Col } from 'antd';

interface EmployeeFormActionsProps {
  editing: boolean;
  changed: boolean;
  initialValues?: unknown;
  loading?: boolean;
  onEdit?: () => void;
  onSave: () => void;
  onUndo: () => void;
  onBack?: () => void;
}

function EmployeeFormActions({
  editing,
  changed,
  initialValues,
  loading,
  onEdit,
  onSave,
  onUndo,
}: EmployeeFormActionsProps) {
  return (
    <>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          {!editing && onEdit && (
            <Button
              type="primary"
              onClick={onEdit}
              style={{ marginRight: 8 }}
            >
              Изменить
            </Button>
          )}
          {editing && (
            <>
              <Button
                type="primary"
                onClick={onSave}
                loading={loading}
                style={{ marginRight: 8 }}
              >
                Сохранить
              </Button>
              {changed && initialValues && (
                <Button
                  onClick={onUndo}
                  disabled={loading}
                  style={{ marginRight: 8 }}
                >
                  Отмена
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default EmployeeFormActions;
