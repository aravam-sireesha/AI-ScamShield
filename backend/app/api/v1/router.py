from fastapi import APIRouter
from app.api.v1.endpoints.scans import router as scans_router
from app.api.v1.endpoints.threats import router as threats_router
from app.api.v1.endpoints.reports import router as reports_router

api_router = APIRouter()

# Group version 1 paths
api_router.include_router(scans_router, prefix="/scan", tags=["scans"])
api_router.include_router(threats_router, prefix="/threat-intel", tags=["threat-intelligence"])
api_router.include_router(reports_router, prefix="/reports", tags=["reports"])
