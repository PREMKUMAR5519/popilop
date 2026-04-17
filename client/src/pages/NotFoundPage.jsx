import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="p_not-found">
      <p className="c_eyebrow">404</p>
      <h1>That page drifted out of orbit.</h1>
      <p>The route exists in neither the creator workspace nor the public experience.</p>
      <Link to="/">
        <Button>Back home</Button>
      </Link>
    </div>
  );
}
