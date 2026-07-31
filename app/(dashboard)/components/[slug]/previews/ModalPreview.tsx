'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Modal's own
// file avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Modal } from 'design-system/src/components/Modal/Modal';
import { Button } from 'design-system/src/components/Button/Button';

export default function Preview() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [noFooterOpen, setNoFooterOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [noMaskOpen, setNoMaskOpen] = useState(false);
  const [blurMaskOpen, setBlurMaskOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={() => setBasicOpen(true)}>
          Open Modal
        </Button>
        <Button variant="primary" onClick={() => setNoFooterOpen(true)}>
          No Footer
        </Button>
        <Button variant="primary" onClick={() => setConfirmOpen(true)}>
          Confirm
        </Button>
        <Button variant="primary" onClick={() => setInfoOpen(true)}>
          Info
        </Button>
        <Button variant="primary" onClick={() => setSuccessOpen(true)}>
          Success
        </Button>
        <Button variant="primary" onClick={() => setWarningOpen(true)}>
          Warning
        </Button>
        <Button variant="primary" onClick={() => setErrorOpen(true)}>
          Error
        </Button>
        <Button variant="primary" onClick={() => setNoMaskOpen(true)}>
          No Mask
        </Button>
        <Button variant="primary" onClick={() => setBlurMaskOpen(true)}>
          Blur Mask
        </Button>
      </div>

      <Modal
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        onOk={() => setBasicOpen(false)}
        onCancel={() => setBasicOpen(false)}
        title="Basic Modal"
      >
        Some contents...
        <br />
        Some contents...
        <br />
        Some contents...
      </Modal>

      <Modal
        open={noFooterOpen}
        onClose={() => setNoFooterOpen(false)}
        title="No Footer"
        footer={null}
      >
        Some contents...
      </Modal>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onOk={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
        type="confirm"
        title="Confirm"
      >
        Bla bla...
      </Modal>

      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        onOk={() => setInfoOpen(false)}
        onCancel={() => setInfoOpen(false)}
        type="info"
        title="This is a notification message"
      >
        This modal will be destroyed automatically after 1 second.
      </Modal>

      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        onOk={() => setSuccessOpen(false)}
        onCancel={() => setSuccessOpen(false)}
        type="success"
        title="This is a success message"
      >
        This modal will be destroyed automatically after 1 second.
      </Modal>

      <Modal
        open={warningOpen}
        onClose={() => setWarningOpen(false)}
        onOk={() => setWarningOpen(false)}
        onCancel={() => setWarningOpen(false)}
        type="warning"
        title="This is a warning message"
      >
        This modal will be destroyed automatically after 1 second.
      </Modal>

      <Modal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        onOk={() => setErrorOpen(false)}
        onCancel={() => setErrorOpen(false)}
        type="error"
        title="This is an error message"
      >
        This modal will be destroyed automatically after 1 second.
      </Modal>

      <Modal
        open={noMaskOpen}
        onClose={() => setNoMaskOpen(false)}
        onOk={() => setNoMaskOpen(false)}
        onCancel={() => setNoMaskOpen(false)}
        mask="none"
        title="No Mask"
      >
        This modal renders without a backdrop overlay (mask="none").
      </Modal>

      <Modal
        open={blurMaskOpen}
        onClose={() => setBlurMaskOpen(false)}
        onOk={() => setBlurMaskOpen(false)}
        onCancel={() => setBlurMaskOpen(false)}
        mask="blur"
        title="Blur Mask"
      >
        This modal blurs the content behind it (mask="blur").
      </Modal>
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Modal, Button } from 'design-system';

export default function Example() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [noMaskOpen, setNoMaskOpen] = useState(false);
  const [blurMaskOpen, setBlurMaskOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        title="Basic Modal"
      >
        Some contents...
      </Modal>

      {/* Status types: 'default' | 'info' | 'success' | 'warning' | 'error' | 'confirm' */}
      <Button variant="primary" onClick={() => setConfirmOpen(true)}>
        Confirm
      </Button>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onOk={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
        type="confirm"
        title="Confirm"
      >
        Bla bla...
      </Modal>

      {/* mask: 'dimmed' (default) | 'blur' | 'none' - controls the backdrop overlay */}
      <Button variant="primary" onClick={() => setNoMaskOpen(true)}>
        No Mask
      </Button>

      <Modal
        open={noMaskOpen}
        onClose={() => setNoMaskOpen(false)}
        onOk={() => setNoMaskOpen(false)}
        onCancel={() => setNoMaskOpen(false)}
        mask="none"
        title="No Mask"
      >
        This modal renders without a backdrop overlay (mask="none").
      </Modal>

      <Button variant="primary" onClick={() => setBlurMaskOpen(true)}>
        Blur Mask
      </Button>

      <Modal
        open={blurMaskOpen}
        onClose={() => setBlurMaskOpen(false)}
        onOk={() => setBlurMaskOpen(false)}
        onCancel={() => setBlurMaskOpen(false)}
        mask="blur"
        title="Blur Mask"
      >
        This modal blurs the content behind it (mask="blur").
      </Modal>
    </>
  );
}`;
