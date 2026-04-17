import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';

export default function MediaLibraryPage() {
  const { mediaLibrary, loading } = useAppData();

  return (
    <Card>
      <div className="c_section-intro">
        <div>
          <p className="c_eyebrow">Media library</p>
          <h2>Organized assets and delivery files</h2>
        </div>
      </div>
      <Table
        columns={[
          { key: 'name', label: 'File' },
          { key: 'type', label: 'Type' },
          { key: 'folder', label: 'Folder' },
          { key: 'size', label: 'Bytes' }
        ]}
        rows={mediaLibrary || []}
      />
      {!loading && !(mediaLibrary || []).length ? <EmptyState title="No media assets yet" description="Upload files once Cloudflare R2 is configured and assets will appear here." /> : null}
    </Card>
  );
}
