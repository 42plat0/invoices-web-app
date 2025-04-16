import './static/StatusBadge.css'

export default function StatusBadge ({ status, invoiceId }){

    return (
        <button className={`badge badge_${status} capitalize`}>
            <span className={`badge-dot badge_${status}-dot`}></span>
            <span>{status}</span>
        </button>
    );
};
